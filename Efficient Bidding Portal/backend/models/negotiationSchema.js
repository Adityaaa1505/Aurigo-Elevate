const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  tenderMatchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TenderMatch',
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  vendorBid: {
    type: Number,
    required: true,
  },
  clientOffer: {
    type: Number,
    required: true,
  },
  negotiationStatus: {
    type: String,
    enum: ['in-progress', 'accepted', 'rejected'],
    default: 'in-progress',
  },
  finalAgreement: {
    type: Boolean,
    default: false,
  },
});

const Negotiation = mongoose.model('Negotiation', negotiationSchema);

module.exports = Negotiation;
