const Transaction = require('../models/transactionSchema.js');

// Create a transaction
exports.createTransaction = async (req, res) => {
  try {
    const { tenderMatchId, totalPrice, paymentDetails } = req.body;
    const newTransaction = new Transaction({ tenderMatchId, totalPrice, paymentDetails });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
