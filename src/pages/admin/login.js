// src/pages/admin-login.js

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

export const metadata = {
  title: "Login",
}

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.username.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      return;
    }

    try {
      const response = await axios.post('/api/login', loginData);
      // console.log(response.data.message, "response")
      if (response.status === 200) {
        toast.success("Logged In");

        router.push('/admin/dashboard');

        // Redirect to admin dashboard.
        // You can use Next.js router or similar.
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      // console.log('Login failed', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-fit pt-16 px-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 ">
        <h1 className="text-2xl text-center font-semibold mb-6">Login</h1>
        <form onSubmit={handleLogin}  passive="false" className='flex flex-col '>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Username</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              type="text" value={loginData.username} 
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  username: event.target.value,
                });
              }}
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              type="password" value={loginData.password} 
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className='flex  justify-center'>
          <button
            className="bg-blue-500 w-full md:w-3/5 text-white py-2 mt-3 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
// <div>
//   <h1>Admin Login</h1>
//   <form onSubmit={handleLogin} className='flex flex-col  items-center'>
//     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
//     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//     <button type="submit">Login</button>
//   </form>
// </div>