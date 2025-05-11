const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      price: {
        type: Number,
        required: true,
      },
      availability: {
        type: Number,
        required: true, // Number of units available
      },
      deliveryTime: {
        type: Number, // Time in days
        required: true,
      },
    },
  ],
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
