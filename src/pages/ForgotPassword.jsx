import React, { useState } from "react";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      alert("✅ Reset code sent to your email.");
      navigate("/confirm-password",{state:{email} });
    } catch (err) {
      alert(err.response?.data?.error || "Request failed");
    }
  };

  return (
    <form onSubmit={handleForgot}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Code</button>
    </form>
  );
}
