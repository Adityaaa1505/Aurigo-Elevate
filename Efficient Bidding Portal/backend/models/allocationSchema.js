const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  allocations: [
    {
      vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantityAllocated: {
        type: Number,
        required: true, // Quantity allocated by the vendor to the client
      },
      quantityRequired: {
        type: Number,
        required: true, // Quantity required by the client
      },
      quantityAvailable: {
        type: Number,
        required: true, // Quantity available with the vendor
      },
      pricePerUnit: {
        type: Number,
        required: true, // Price per unit offered by the vendor
      },
      totalCost: {
        type: Number,
        required: true, // quantityAllocated * pricePerUnit
      },
    },
  ],
});

const Allocation = mongoose.model("Allocation", allocationSchema);

module.exports = Allocation;
