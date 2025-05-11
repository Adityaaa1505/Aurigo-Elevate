const Vendor = require('../models/vendorSchema.js');

// Create a new vendor
exports.createVendor = async (req, res) => {
  try {
    const { name, contact, products } = req.body;

    console.log(req.body)
    const newVendor = new Vendor({
      userId: req.body.id, // Associate vendor with the authenticated user
      name,
      contact,
      products,
    });

    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Get the authenticated user's vendor
exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.body.id }); // Use userId from JWT
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.status(200).json({ success: true, data: vendor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get a single vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Update the authenticated user's vendor
exports.updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedVendor) return res.status(404).json({ msg: 'Vendor not found' });
    res.json(updatedVendor);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

// Delete the authenticated user's vendor
exports.deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findOneAndDelete({ userId: req.user.id });
    if (!deletedVendor) return res.status(404).json({ msg: 'Vendor not found' });
    res.json({ msg: 'Vendor deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
