import React from 'react'
import img1 from "../assets/Icon 7.svg"
import img2 from "../assets/Icon 12.svg"
import {Link, Router} from "react-router"

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}

      <aside className="w-1/6 bg-gray-800 p-4 flex flex-col items-center space-y-4">
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
            <h1 className="text-lg font-bold text-gray-800">HI YORK & CO !</h1></div>
          
          <span className="text-red-500 font-bold text-2xl">aurigo elevate</span>
        </header>

        <div className="mt-6 grid grid-cols-7 gap-4">
          {/* Left Column */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
              <img src={img2} alt="construction" className="w-60 h-60" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-60">
              <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Weather History</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-60">
              <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Natural Disaster Report</h2>
            </div>
          </div>

          {/* Center Column - Project Info */}
          <div className="col-span-2 bg-gray-800 p-8 rounded-lg text-white shadow-lg ">
            <ul className="space-y-6 mt-20">
              <li className="flex items-center space-x-4 mt-6 ">
                <span className="text-2xl">✔️</span>
                <div>
                  <p className="text-lg">Estimated project start time:</p>
                  <p className="text-gray-400">24th April 2025</p>
                </div>
              </li>
              <li className="flex items-center space-x-4 mt-6">
                <span className="text-2xl">✔️</span>
                <div>
                  <p className="text-lg">Buffer period:</p>
                  <p className="text-gray-400">24 days</p>
                </div>
              </li>
              <li className="flex items-center space-x-4 mt-6">
                <span className="text-2xl">✔️</span>
                <div>
                  <p className="text-lg">Estimated project completion time:</p>
                  <p className="text-gray-400">24th April 2025</p>
                </div>
              </li>
            </ul>
            <div className="mt-15 flex justify-center items-center">
              <img
                src={img1}
                alt="blueprint"
                className="w-60 h-45"
              />
            </div>
          </div>

          {/* Right Column - Placeholder Boxes */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md h-100">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Air Quality</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md h-100">
            <h2 className="font-semibold text-gray-700 border-l-4 border-red-500 pl-2">Weather History</h2>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard