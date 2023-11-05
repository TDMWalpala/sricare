import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom' ;
function SignupForm() {
  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


const navigate = useNavigate();
  const backendURL =  'http://localhost:3001';
  const handleSubmit = async (e) => {
    e.preventDefault();

    // You can add client-side validation here if needed


    // Send a POST request to the backend to create a new user
    try {
      const response = await fetch(`${backendURL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 200) {
     
       navigate('/login');
      } else {
        const data = await response.json();
        setErrorMessage(data.msg || 'Signup failed');
  
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-start">
            <label htmlFor="username" className="text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex flex-col items-start">
            <label htmlFor="password" className="text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-center flex  justify-between">
          <p>Already have an account?</p>
          <button className="text-blue-500 text-sm underline" >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
