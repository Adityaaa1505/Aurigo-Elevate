import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/userContext';

const Login = () => {
  const {email,setEmail,setName, setRole, setToken} = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success state

    try {
      console.log(email,password);
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });
      console.log(response);
      // Assuming the response contains the JWT token and user info
      
      setToken(response.data.token); // Save token to localStorage
      setName(response.data.name);
      setRole(response.data.role);
      
      setSuccess(true);
      console.log('Login successful:', response.data);
    } catch (err) {
      console.log(err)
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Login successful!</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
