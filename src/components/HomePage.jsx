import React from 'react'
import { Link } from "react-router-dom";

const HomePage = () => {


  return (
    
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Welcome to Sunshine Hospital
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Providing quality healthcare with compassion and care.
      </p>

      {/* Login Button */}
      <div className="flex gap-4">
      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Login
      </Link>
      <Link to="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">Register</Link>
      </div>
    </div>
  
  )
}

export default HomePage