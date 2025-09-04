import React, { useState } from "react";
import { Confirm } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // get email passed from signup
  const email = location.state?.email || "";
  console.log(location);
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await Confirm({ email, code });   // send both email + code
      alert("Email verified! Please login.");
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.error || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Verify Email</h2>
      <p>Email: <strong>{email}</strong></p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Verify</button>
    </form>
  );
}

