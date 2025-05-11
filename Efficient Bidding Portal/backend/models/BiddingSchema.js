const mongoose = require('mongoose');

const BiddingSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }, // Status of the bidding
});

module.exports = mongoose.model('Bidding', BiddingSchema);
