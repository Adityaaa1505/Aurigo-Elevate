import React, { useState, useEffect } from 'react';

const Bid = () => {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bids/getAllBids', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch bidding details');
        }

        setBids(data); // Update the state with the bids
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-1/6 bg-gray-800 p-6 flex flex-col space-y-6">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Menu</h2>
        <button className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Add Product</button>
        <button className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Bid</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Product Marketplace</h1>
          <span className="text-red-500 font-bold">aurigo elevate</span>
        </header>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : bids.length === 0 ? (
            <div className="text-center text-gray-500">No bids available</div>
          ) : (
            bids.map((bid, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                <p className="text-gray-600 mt-2">
                  Client: <span className="font-medium">John Doe</span>
                </p>
                <p className="text-gray-600 mt-2">
                  Initial Price: <span className="font-medium">${bid.initialPrice}</span>
                </p>
                <p className="text-gray-600 mt-2">
                  Status: <span className="font-medium">{bid.status}</span>
                </p>

                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800">Bids</h4>
                  {bid.bids.map((bidDetail, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-gray-600">
                        Vendor: <span className="font-medium">John Doe</span>
                      </p>
                      <p className="text-gray-600">
                        Quantity: <span className="font-medium">{bidDetail.quantity}</span>
                      </p>
                      <p className="text-gray-600">
                        Price Per Unit: <span className="font-medium">${bidDetail.pricePerUnit}</span>
                      </p>
                      <p className="text-gray-600">
                        Total Cost: <span className="font-medium">${bidDetail.totalCost}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Bid;
