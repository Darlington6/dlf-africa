const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    // Basic Donor Info
    name: { 
      type: String, 
      required: function() { return !this.isAnonymous } 
    },
    email: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          // Basic email format validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },

    // Payment Details
    amount: { 
      type: Number, 
      required: true,
      min: [100, "Amount must be at least GHS 1.00"] // 100 pesewas = 1 GHS
    },
    frequency: { 
      type: String, 
      enum: ["one-time", "monthly"], 
      required: true,
      default: "one-time"
    },

    // Paystack References
    paystackReference: { 
      type: String, 
      index: true,
      unique: true,
      sparse: true
    },
    authorizationCode: { 
      type: String, // For recurring charges
      select: false // Never return in queries
    },

    // Subscription Management
    isActive: {
      type: Boolean,
      default: true
    },
    nextChargeDate: {
      type: Date
    },

    // Additional Info
    isAnonymous: { 
      type: Boolean, 
      default: false 
    },
    message: { 
      type: String,
      maxlength: [500, "Message cannot exceed 500 characters"]
    },

    // Verification Status
    emailVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      select: false
    }
  }, 
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
donationSchema.index({ email: 1, isActive: 1 });
donationSchema.index({ nextChargeDate: 1, frequency: 1 });

// Virtual for formatted amount
donationSchema.virtual('amountInGHS').get(function() {
  return (this.amount / 100).toFixed(2);
});

// Pre-save hook for email verification
donationSchema.pre('save', async function(next) {
  if (this.isModified('email') && !this.isAnonymous) {
    this.emailVerified = false;
    this.verificationToken = require('crypto').randomBytes(20).toString('hex');
  }
  next();
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;