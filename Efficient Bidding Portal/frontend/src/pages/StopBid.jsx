import React from "react";

const StopBid = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
      <div className="text-center p-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-16">Bidding is going on right now</h1>
        <div><button
          className="bg-red-500 text-white px-8 py-3 mt-10 rounded-lg text-lg font-semibold shadow-md 
                     hover:bg-red-600 transition-all duration-300"
        >
          Stop Bid
        </button></div>
        
      </div>
    </div>
  );
};

export default StopBid;
