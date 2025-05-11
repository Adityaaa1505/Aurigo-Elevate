const Vendor = require('../models/vendorSchema.js');

async function optimizeAllocationForClient(client) {
  try {
    const { productRequests } = client;

    // Step 1: Prepare the result object
    const allocationResult = {
      clientId: client.userId,
      allocations: [], // Stores allocation details
    };

    // Step 2: Iterate over each product requested by the client
    for (const request of productRequests) {
      const { productId, quantity } = request;

      // Step 3: Find vendors who sell this product by productId
      const vendors = await Vendor.find({ 'products.productId': productId }).populate('products');

      // Filter vendors to include only those with sufficient quantity and sort by price per unit
      const eligibleVendors = vendors
        .map((vendor) => {
          const product = vendor.products.find((p) => p.productId.toString() === productId.toString());
          if (product && product.availability >= 0) {
            return {
              vendorId: vendor.userId,
              productId: product.productId,
              pricePerUnit: product.price,
              availableQuantity: product.availability,
            };
          }
          return null;
        })
        .filter((vendor) => vendor) // Exclude null entries
        .sort((a, b) => a.pricePerUnit - b.pricePerUnit); // Sort by price per unit (ascending)

      // Step 4: Allocate product from vendors
      let remainingQuantity = quantity;
      for (const vendor of eligibleVendors) {
        if (remainingQuantity === 0) break;

        const allocatedQuantity = Math.min(vendor.availableQuantity, remainingQuantity);

        allocationResult.allocations.push({
          vendorId: vendor.vendorId,
          productId: vendor.productId,
          quantityAllocated: allocatedQuantity,
          quantityRequired: quantity,
          pricePerUnit: vendor.pricePerUnit,
          totalCost: allocatedQuantity * vendor.pricePerUnit,
        });

        // Update remaining quantity
        remainingQuantity -= allocatedQuantity;

        // Step 5: Update vendor's available quantity in the database
        await Vendor.updateOne(
          { userId: vendor.vendorId, 'products.productId': vendor.productId },
          { $inc: { 'products.$.availability': -allocatedQuantity } }
        );
      }

      // Step 6: If the full quantity can't be allocated, add a log or handle it (e.g., partial fulfillment warning)
      if (remainingQuantity > 0) {
        console.warn(
          `Insufficient stock for productId: ${productId}. Remaining quantity not allocated: ${remainingQuantity}`
        );
      }
    }

    // Return the final allocation result
    return allocationResult;
  } catch (error) {
    console.error('Error in optimizeAllocationForClient:', error.message);
    throw new Error('Could not optimize allocation for client.');
  }
}

module.exports = { optimizeAllocationForClient };
