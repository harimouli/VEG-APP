import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import SigninImage from "../assets/signin.jpg";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:3000/api/user/signin", {
        email,
        password,
      });

      const { token, user } = res.data;

      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      Cookies.set("user", JSON.stringify(user), {
        expires: 7,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      setMsg("Login successful");

      if (user.is_admin) {
        navigate("/admindashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2 h-48 md:h-auto">
          <img
            src={SigninImage}
            alt="Sign In"
            className="w-full h-full object-cover"
          />
        </div>

      
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          {msg && (
            <p className="mt-4 text-center text-sm sm:text-base text-red-500 font-medium">
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
