const Negotiation = require('../models/negotiationSchema.js');

// Create a negotiation
exports.createNegotiation = async (req, res) => {
  try {
    const { tenderMatchId, vendorId, clientId, vendorBid, clientOffer } = req.body;
    const newNegotiation = new Negotiation({ tenderMatchId, vendorId, clientId, vendorBid, clientOffer });

    await newNegotiation.save();
    res.status(201).json(newNegotiation);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update negotiation status (e.g., accepted, rejected)
exports.updateNegotiation = async (req, res) => {
  try {
    const updatedNegotiation = await Negotiation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNegotiation) return res.status(404).json({ msg: 'Negotiation not found' });
    res.json(updatedNegotiation);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
