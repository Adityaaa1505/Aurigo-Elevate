const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tenderMatchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TenderMatch',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'canceled'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentDetails: {
    paymentMethod: String, // e.g., credit card, bank transfer
    transactionId: String,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
