import React, { useState, useEffect, useCallback } from "react";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import "../components/DonationPage.css";
import Footer from "../components/Footer"; // Import the Footer component

const DonationPage = () => {
  const publicKey = "pk_test_297234307334246a36e229647fa1091dedb2b63b";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(""); 
  const [frequency, setFrequency] = useState("one-time");
  const [anonymous, setAnonymous] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const donationAmounts = [
    { value: "2000", text: "Support Internet Access" },
    { value: "4000", text: "Provide software tools" },
    { value: "6000", text: "Buy laptops for 2 students" },
    { value: "8000", text: "Buy laptops for 3 students" },
    { value: "9000", text: "Organize events and competitions" },
    { value: "10000", text: "Sponsor a child's basic education" },
  ];

  // Format amount for Paystack (in pesewas)
  const formatAmountForPaystack = (amount) => {
    const numericAmount = amount ? Number(amount.toString().replace(/[^0-9]/g, '')) : 0;
    return numericAmount * 100;
  };

  // Email validation with existence check
  const verifyEmailExistence = useCallback(async (email) => {
    try {
      setIsVerifyingEmail(true);
      const response = await axios.post('/api/verify-email', { email });
      return response.data.valid;
    } catch (error) {
      console.error("Email verification failed:", error);
      // If verification fails, still allow the form to proceed
      return true;
    } finally {
      setIsVerifyingEmail(false);
    }
  }, []);

  const showMessage = useCallback((msg, type) => {
    setStatusMessage(msg);
    setStatusType(type);
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  }, []);

  const validateForm = useCallback(async () => {
    const amountValue = amount ? Number(amount.toString().replace(/[^0-9]/g, '')) : 0;
    const isAmountValid = amountValue > 0;
    const isNameValid = anonymous || (firstName && lastName);
    
    let isEmailValid = true;
    if (!anonymous && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isEmailValid = emailRegex.test(email);
      
      if (isEmailValid && emailTouched) {
        // Don't wait for email verification to set form validity
        verifyEmailExistence(email).then(isValid => {
          setEmailError(isValid ? "" : "Please enter a valid email address");
        });
      } else if (!isEmailValid) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    } else if (!anonymous && !email) {
      isEmailValid = false;
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    // Form is valid if amount is valid, name is valid, and either anonymous or email is valid
    setIsFormValid(isAmountValid && isNameValid && (anonymous || isEmailValid));
  }, [firstName, lastName, email, amount, anonymous, emailTouched, verifyEmailExistence]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailTouched(true);

    if (!anonymous && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    } else if (!anonymous && !value) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setAmount(numericValue);
  };

  const handleAmountSelection = (value) => {
    setAmount(value);
  };

  const onSuccess = (response) => {
    console.log("Payment successful:", response);
    const message = frequency === "monthly" 
      ? "Thank you for setting up your monthly donation! 🎉" 
      : "Thank you for your generous donation! 🎉";
    showMessage(message, "success");

    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAmount("");
      setFrequency("one-time");
      setAnonymous(false);
      setIsFormValid(false);
      setEmailError("");
      setEmailTouched(false);
    }, 1000);
  };

  const onClose = () => {
    showMessage("Payment was not completed. Please try again.", "error");
  };

  const paystackProps = {
    className: `paystack-button ${!isFormValid ? 'disabled' : ''}`,
    email: anonymous ? "anonymous@donor.com" : email,
    amount: formatAmountForPaystack(amount),
    publicKey: publicKey,
    onSuccess: onSuccess,
    onClose: onClose,
    currency: "GHS",
    text: frequency === "monthly" ? "Subscribe Monthly" : "Donate Now",
    disabled: !isFormValid || isVerifyingEmail,
    metadata: {
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: anonymous ? "Anonymous Donor" : `${firstName} ${lastName}`
        },
        {
          display_name: "Donation Type",
          variable_name: "donation_type",
          value: frequency
        },
        {
          display_name: "Donation Purpose",
          variable_name: "donation_purpose",
          value: donationAmounts.find(d => d.value === amount)?.text || "Custom Amount"
        }
      ]
    }
  };

  return (
    <div className="donation-page-container">
      <div className="donation-header-image">
        <img 
          src="/donation-header.jpeg"
          alt="Students learning digital skills" 
          className="header-image"
        />
      </div>

      <div className="donation-header">
        <h1>Empower the Next Digital Generation</h1>
        <p> Support our mission by contributing to our cause. Your donations help us provide: <strong>Laptops</strong> and tablets for students, <strong>Internet</strong> connectivity for rural schools, and <strong>Resources</strong> for organizing training sessions and competitions.</p>
        <p>Your donation helps bridge the digital divide!</p>
      </div>

      {showStatus && (
        <div className={`message-box ${statusType}`}>{statusMessage}</div>
      )}

      <div className="donation-form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="frequency-container">
            <h3>Donation Frequency</h3>
            <div className="frequency-options">
              <label>
                <input
                  type="radio"
                  value="one-time"
                  checked={frequency === "one-time"}
                  onChange={(e) => setFrequency(e.target.value)}
                /> One-time
              </label>
              <label>
                <input
                  type="radio"
                  value="monthly"
                  checked={frequency === "monthly"}
                  onChange={(e) => setFrequency(e.target.value)}
                /> Monthly
              </label>
            </div>
          </div>

          {frequency === "monthly" && (
            <div className="monthly-notice">
              <p>Monthly donations will be automatically charged each month using Paystack subscriptions.</p>
            </div>
          )}

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => {
                setAnonymous(!anonymous);
                if (!anonymous) {
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setEmailError("");
                }
              }}
            />
            Make this donation anonymous
          </label>

          {!anonymous && (
            <>
              <div className="name-fields">
                <label>
                  First Name:
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </label>
              </div>

              <label>
                Email:
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailTouched(true)}
                  required
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
                {isVerifyingEmail && (
                  <div className="verifying-message">Verifying email...</div>
                )}
              </label>
            </>
          )}

          <div className="donation-amounts">
            {donationAmounts.map((donation) => (
              <div
                key={donation.value}
                className={`donation-box ${amount === donation.value ? "selected" : ""}`}
                onClick={() => handleAmountSelection(donation.value)}
              >
                GHS {donation.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                <span className="tooltip">{donation.text}</span>
              </div>
            ))}
          </div>

          <label>
            Or Enter Custom Amount:
            <div className="custom-amount-container">
              <span className="currency-prefix">GHS</span>
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
          </label>

          <PaystackButton {...paystackProps} />
        </form>
      </div>
      {/* Footer Added Here */}
      <Footer />
    </div>
  );
};

export default DonationPage;