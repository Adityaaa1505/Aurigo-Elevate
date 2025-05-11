import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/userContext";
import {jwtDecode} from "jwt-decode";

const Client = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [clientDetails, setClientDetails] = useState({
    contactName: "",
    phone: "",
  });

  const { name, email, token } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);
  
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
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setCartItems([
      ...cartItems,
      { id: Date.now(), product: "", quantity: 1 },
    ]);
  };

  const handleProductChange = (index, event) => {
    const newCartItems = [...cartItems];
    newCartItems[index].product = event.target.value;
    setCartItems(newCartItems);
  };

  const handleQuantityChange = (index, event) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = event.target.value;
    setCartItems(newCartItems);
  };

  const handleRemoveProduct = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const handleInputChange = (field, value) => {
    setClientDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      id: id, // Include the client ID from the decoded token
      name: name, // Include the user's name
      contact: {
        email: email,
        phone: clientDetails.phone,
      },
      productRequests: cartItems.map((item) => ({
        productId: item.product,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(clientData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Failed to submit client details");
      }

      alert("Client details submitted successfully!");
    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Requirements Submission
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name and Email (Disabled Fields) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name} // Dynamically set the user's name
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
                value={email} // Dynamically set the user's email
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
                value={clientDetails.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Add Products Section */}
          <div className="space-y-4 mt-6">
            {cartItems.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="w-3/4">
                  <select
                    value={item.product}
                    onChange={(event) => handleProductChange(index, event)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 mr-3"
                  >
                    <option value="">Select a product</option>
                    {productOptions.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center w-1/4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(event) => handleQuantityChange(index, event)}
                    placeholder="Qty"
                    className="mt-1 ml-4 block w-3/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleAddProduct}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add More Products
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Client;
