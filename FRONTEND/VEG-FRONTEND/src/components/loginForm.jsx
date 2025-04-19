import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("http://localhost:3000/signin", {
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
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Signin;
