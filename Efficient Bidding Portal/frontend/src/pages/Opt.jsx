import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/userContext";

const Opt = () => {
  const [totalCost, setTotalCost] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const [id, setId] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setId(decoded.user.id); // Assuming the token has userId
      } catch (err) {
        console.error("Invalid token:", err);
        setError("Failed to decode token");
      }
    }
  }, [token]); // Dependency on token to trigger when it's updated

  useEffect(() => {
    if (!id) return; // Prevent API call if id is not set

    const fetchAllocations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/alloc/getAllocations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientId: id }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch allocation details");
        }

        // Calculate the total cost from the allocation data
        let total = 0;
        data.forEach((allocation) => {
          allocation.allocations.forEach((alloc) => {
            total += alloc.totalCost; // Sum up the total cost
          });
        });

        setTotalCost(total); // Update the state with the total cost
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchAllocations();
  }, [id]); // Dependency on id to trigger when it's set

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      {/* Card for Optimal Cost */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Optimal Cost
        </h1>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : totalCost !== null ? (
          <p className="text-4xl font-bold text-blue-500 text-center mb-6">
            ${totalCost.toFixed(2)}
          </p>
        ) : (
          <p className="text-gray-600 text-center mb-6">Loading...</p>
        )}

        <p className="text-gray-600 text-center mb-6">
          This is the minimum possible cost calculated for your requirements.
        </p>

        {/* Question */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Are you ready to enter the bidding phase?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Yes
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opt;
