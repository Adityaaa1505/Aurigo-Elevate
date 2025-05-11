const mongoose = require('mongoose');
const User = require('../models/userSchema'); // Adjust the path as needed
const Vendor = require('../models/vendorSchema'); // Adjust the path as needed
const Client = require('../models/clientSchema'); // Adjust the path as needed
const Product = require('../models/productSchema'); // Adjust the path as needed

// MongoDB URI

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// Seed data
const products = [
  { name: 'Product A', category: 'Electronics', description: 'High-end smartphone' },
  { name: 'Product B', category: 'Electronics', description: 'Laptop with high specs' },
  { name: 'Product C', category: 'Furniture', description: 'Comfortable office chair' },
  { name: 'Product D', category: 'Furniture', description: 'Wooden desk' },
  { name: 'Product E', category: 'Clothing', description: 'Formal shirt' },
  { name: 'Product F', category: 'Clothing', description: 'Jeans' },
];

const vendors = [
  {
    name: 'Vendor A',
    contact: { email: 'vendorA@example.com', phone: '1234567890' },
    products: [
      { productId: null, price: 500, availability: 10, deliveryTime: 5 },
      { productId: null, price: 800, availability: 20, deliveryTime: 7 },
    ],
  },
  {
    name: 'Vendor B',
    contact: { email: 'vendorB@example.com', phone: '0987654321' },
    products: [
      { productId: null, price: 300, availability: 15, deliveryTime: 3 },
      { productId: null, price: 200, availability: 25, deliveryTime: 6 },
    ],
  },
];

const clients = [
  {
    name: 'Client A',
    contact: { email: 'clientA@example.com', phone: '1122334455' },
    productRequests: [
      { productId: null, quantity: 5, maxPrice: 400 },
      { productId: null, quantity: 3, maxPrice: 600 },
    ],
  },
  {
    name: 'Client B',
    contact: { email: 'clientB@example.com', phone: '2233445566' },
    productRequests: [
      { productId: null, quantity: 2, maxPrice: 1000 },
      { productId: null, quantity: 4, maxPrice: 800 },
    ],
  },
];

async function seedData() {
  try {
    // Clear the database
    await Product.deleteMany({});
    await Vendor.deleteMany({});
    await Client.deleteMany({});
    await User.deleteMany({});

    // Create product entries
    const createdProducts = await Product.insertMany(products);
    console.log('Products created:', createdProducts);

    // Link productId in vendor's products array
    vendors[0].products[0].productId = createdProducts[0]._id;
    vendors[0].products[1].productId = createdProducts[1]._id;
    vendors[1].products[0].productId = createdProducts[2]._id;
    vendors[1].products[1].productId = createdProducts[3]._id;

    // Create vendor entries
    const createdVendors = await Vendor.insertMany(vendors);
    console.log('Vendors created:', createdVendors);

    // Link productId in client's product requests
    clients[0].productRequests[0].productId = createdProducts[0]._id;
    clients[0].productRequests[1].productId = createdProducts[1]._id;
    clients[1].productRequests[0].productId = createdProducts[2]._id;
    clients[1].productRequests[1].productId = createdProducts[4]._id;

    // Create client entries
    const createdClients = await Client.insertMany(clients);
    console.log('Clients created:', createdClients);

    console.log('Data seeding complete!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  }
}

seedData();
