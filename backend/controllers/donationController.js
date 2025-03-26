const Donation = require("../models/Donation");

const addDonation = async (req, res) => {
  const { name, email, amount, frequency, message } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid donation amount" });
  }

  try {
    const donation = await Donation.create({ name, email, amount, frequency, message });
    res.status(201).json({ message: `Thank you for your ${frequency} donation of $${amount}!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDonation, getDonations };
