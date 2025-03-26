const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const axios = require('axios');
const crypto = require('crypto');
const { validateEmail } = require('../utils/validators');

// Initialize Paystack
const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

// Middleware to verify Paystack signature
const verifyPaystackSignature = (req, res, next) => {
  const hash = crypto.createHmac('sha512', paystackSecret)
                   .update(JSON.stringify(req.body))
                   .digest('hex');
  
  if (hash !== req.headers['x-paystack-signature']) {
    return res.sendStatus(403);
  }
  next();
};

// Process donation endpoint
router.post('/process', async (req, res) => {
  try {
    const { name, email, amount, frequency, anonymous, purpose } = req.body;

    // Validate email
    if (!anonymous && !validateEmail(email)) {
      return res.status(400).json({ error: "Please provide a valid email address" });
    }

    // Initialize payment
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: anonymous ? 'anonymous@donor.com' : email,
      amount: amount * 100,
      metadata: {
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: anonymous ? "Anonymous" : name },
          { display_name: "Donation Type", variable_name: "donation_type", value: frequency },
          { display_name: "Donation Purpose", variable_name: "donation_purpose", value: purpose }
        ]
      }
    }, {
      headers: {
        Authorization: `Bearer ${paystackSecret}`
      }
    });

    // Create donation record (unverified)
    const donation = new Donation({
      name: anonymous ? 'Anonymous' : name,
      email: anonymous ? 'anonymous@donor.com' : email,
      amount,
      frequency,
      isAnonymous: anonymous,
      paystackReference: response.data.data.reference,
      status: 'pending'
    });

    await donation.save();

    res.json({
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference
    });

  } catch (error) {
    console.error('Donation processing error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Could not process donation',
      details: error.response?.data?.message || error.message
    });
  }
});

// Verify payment endpoint
router.post('/verify', async (req, res) => {
  try {
    const { reference } = req.body;

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${paystackSecret}`
      }
    });

    const transaction = response.data.data;

    // Update donation record
    const donation = await Donation.findOneAndUpdate(
      { paystackReference: reference },
      { 
        status: transaction.status === 'success' ? 'completed' : 'failed',
        authorizationCode: transaction.authorization?.authorization_code,
        nextChargeDate: transaction.metadata.donation_type === 'monthly' ? 
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
      },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: "Donation record not found" });
    }

    res.json({ 
      status: donation.status,
      donation
    });

  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Payment verification failed',
      details: error.response?.data?.message || error.message
    });
  }
});

// Webhook for real-time updates
router.post('/webhook', verifyPaystackSignature, async (req, res) => {
  const event = req.body;

  try {
    // Handle successful charges
    if (event.event === 'charge.success') {
      const transaction = event.data;

      // For recurring donations
      if (transaction.subscription) {
        await Donation.findOneAndUpdate(
          { subscriptionId: transaction.subscription.id },
          {
            paystackReference: transaction.reference,
            status: 'completed',
            nextChargeDate: new Date(transaction.subscription.next_payment_date)
          }
        );
      }

      // For one-time donations
      else {
        await Donation.findOneAndUpdate(
          { paystackReference: transaction.reference },
          { status: 'completed' }
        );
      }
    }

    // Handle subscription events
    if (event.event === 'subscription.create') {
      await Donation.findOneAndUpdate(
        { paystackReference: event.data.paystackReference },
        { subscriptionId: event.data.subscription_code }
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.sendStatus(500);
  }
});

// Additional endpoints
router.get('/donations', async (req, res) => {
  // Implementation for fetching donations
});

router.get('/donations/:id', async (req, res) => {
  // Implementation for single donation
});

module.exports = router;