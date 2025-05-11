const Client = require("../models/clientSchema");
const Vendor = require("../models/vendorSchema");

exports.optimizeAllocation = async (req, res) => {
  try {
    // Fetch all client requests
    const clients = await Client.find().populate("productRequests.productId");
    console.log(clientAllocations)
    // Fetch all vendor supplies
    const vendors = await Vendor.find().populate("products.productId");

    const finalAllocations = []; // To store all client allocations

    for (const client of clients) {
      const clientAllocations = []; // Store allocations for this client

      for (const request of client.productRequests) {
        let quantityNeeded = request.quantity;
        const maxBudget = request.maxPrice;

        // Filter vendors with this product
        let eligibleVendors = vendors.filter((vendor) =>
          vendor.products.some((p) => p.productId.equals(request.productId._id))
        );

        // Sort vendors by price (ascending)
        eligibleVendors.sort((a, b) => {
          const priceA = a.products.find((p) =>
            p.productId.equals(request.productId._id)
          ).price;
          const priceB = b.products.find((p) =>
            p.productId.equals(request.productId._id)
          ).price;
          return priceA - priceB;
        });

        // Allocate from vendors
        for (const vendor of eligibleVendors) {
          const product = vendor.products.find((p) =>
            p.productId.equals(request.productId._id)
          );

          const quantityToAllocate = Math.min(
            quantityNeeded,
            product.availability
          );

          const totalCost = quantityToAllocate * product.price;

          // Check budget constraint
          if (totalCost <= maxBudget) {
            clientAllocations.push({
              vendorId: vendor._id,
              productId: request.productId._id,
              quantityAllocated: quantityToAllocate,
              quantityRequired: request.quantity,
              quantityAvailable: product.availability,
              pricePerUnit: product.price,
              totalCost,
            });

            // Update remaining quantities
            quantityNeeded -= quantityToAllocate;
            product.availability -= quantityToAllocate;

            if (quantityNeeded <= 0) break;
          }
        }
      }

      // Save allocations for this client
      if (clientAllocations.length > 0) {
        finalAllocations.push({
          clientId: client._id,
          allocations: clientAllocations,
        });
      }
    }

    // Save all allocations to the database
    await Allocation.insertMany(finalAllocations);

    res.status(200).json({
      success: true,
      message: "Allocations optimized successfully",
      data: finalAllocations,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};
