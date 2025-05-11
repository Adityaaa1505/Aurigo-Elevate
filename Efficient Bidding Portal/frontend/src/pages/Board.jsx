import React from 'react'
import img1 from "../assets/Icon 7.svg"
import img2 from "../assets/Icon 12.svg"
import {Link, Router} from "react-router"

const Board = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}

      <aside className="w-1/6 bg-gray-800 p-4 flex flex-col items-center justify-center space-y-4">
        <div className="w-full h-16 bg-gray-700 rounded-md hover:bg-gray-500"></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500"></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500"></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500 "></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500 "></div>

        <div className="w-full h-90 bg-gray-200 rounded-md   "></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500 "></div>
        <div className="w-full h-16 bg-gray-700 rounded-md  hover:bg-gray-500 "></div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200 p-8">
        <header className="flex justify-between items-center">
          <div className='flex items-center'>
            <div className='rounded-full h-10 w-10 bg-gray-500 mr-4'></div>
            <h1 className="text-lg font-bold text-gray-800">HI TOP VENDOR !</h1></div>
          
          <span className="text-red-500 font-bold text-2xl">aurigo elevate</span>
        </header>

        <div className="mt-6 grid grid-cols-7 gap-4">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 justify-center">
              <img src={img2} alt="construction" className="w-60 h-40" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-40">
              <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Weather History</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-40">
              <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Natural Disaster Report</h2>
            </div>
          </div>

          {/* Center Column - Project Info */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md h-70">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Air Quality</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-70">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Weather History</h2>
            </div>
          </div>

          {/* Right Column - Placeholder Boxes */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md h-70">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Air Quality</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-70">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Weather History</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Board