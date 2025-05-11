import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/userContext";
import {jwtDecode} from "jwt-decode";
const Vendor = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({
    contactName: "",
    phone: "",
  });
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const { name, email, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded)
        setId(decoded.user.id); // Assuming the token has userId
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Failed to decode token");
      }
    }
  }, [token]);

  // Fetch products from the server
  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProductOptions(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchProducts();
    console.log(productOptions)
  }, []);

  const handleAddProduct = () => {
    setCartItems([
      ...cartItems,
      { id: Date.now(), product: productOptions[0]._id, quantity: 1, price: 0, deliveryTime: 0 },
    ]);
  };

  const handleInputChange = (field, value) => {
    setVendorDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (index, field, value) => {
    const newCartItems = [...cartItems];
    newCartItems[index] = {
      ...newCartItems[index],
      [field]: value, // Update the specific field dynamically
    };
    setCartItems(newCartItems);
  };
  

  const handleRemoveProduct = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendorData = {
      userId: id , // Replace with actual user ID
      name,
      contact: {
        email,
        phone: vendorDetails.phone,
      },
      products: cartItems.map((item) => ({
        productId: item.product, // This should now have the correct product._id
        price: item.price,
        availability: item.quantity,
        deliveryTime: item.deliveryTime,
      })),
    };
    console.log(vendorData)
    try {
      const response = await fetch("http://localhost:5000/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(vendorData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to create vendor");
      }

      alert("Vendor created successfully!");
    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Vendor Details
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-600 shadow-sm focus:ring-0 focus:border-gray-300 cursor-not-allowed"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-600 shadow-sm focus:ring-0 focus:border-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                id="contactName"
                value={name}
                onChange={(e) => handleInputChange("contactName", e.target.value)}
                placeholder="Enter contact name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-gray-600 shadow-sm focus:ring-0 focus:border-gray-300 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={vendorDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4">
                <select
                  value={item.product}
                  onChange={(e) => handleProductChange(index,"product" ,e.target.value)} // Passing the selected value (option._id)
                  className="mt-1 block w-1/4 px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                >
                  {productOptions.length === 0 ? (
                    <option disabled>No products available</option>
                  ) : (
                    productOptions.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))
                  )}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                  placeholder="Quantity"
                  className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleProductChange(index, "price", e.target.value)}
                  placeholder="Price"
                  className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <input
                  type="number"
                  value={item.deliveryTime}
                  onChange={(e) => handleProductChange(index, "deliveryTime", e.target.value)}
                  placeholder="Delivery Time (Days)"
                  className="w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddProduct}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-700"
          >
            Add Product
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Submit Vendor Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vendor;
