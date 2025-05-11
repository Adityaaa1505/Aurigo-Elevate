import React from "react";

const DoneBid = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      {/* Card for Optimal Cost */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Optimal Cost
        </h1>
        <p className="text-4xl font-bold text-blue-500 text-center mb-6">
          $1234.56
        </p>
        <p className="text-gray-600 text-center mb-6">
          This is the minimum possible cost calculated for your requirements.
        </p>

        {/* Question */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-4">
            We have optimised your expenditure for this project successfully!
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Done
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoneBid