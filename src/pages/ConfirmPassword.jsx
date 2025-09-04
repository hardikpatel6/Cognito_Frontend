import React, { useState } from "react";
import { confirmPassword } from "../api/auth";   // API call
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ConfirmPassword() {
  const [form, setForm] = useState({
    code: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  console.log(emailFromState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailFromState) {
      alert("Email not found. Please start from 'Forgot Password'.");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    // try {
      const data = {
        code: form.code,
        email: emailFromState,
        password: form.newPassword   // ✅ matches Lambda
      };
      console.log(data);

      const response = await axios.post("https://65yp6hvcc6.execute-api.ap-south-1.amazonaws.com/Prod/auth/confirm-password", data); // API call
      console.log("Confirm password response:", response);
      alert("✅ Password reset successful. Please login.");

      navigate("/signin", {
        state: { email: emailFromState, fromReset: true }
      });
    // } catch (err) {
    //   console.error("Confirm password error:", err);
    //   const errorMsg =
    //     err.response?.data?.error ||
    //     err.message ||
    //     "Reset failed, please try again.";
    //   alert(errorMsg);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <p>Email is: {emailFromState}</p>

      <input
        type="text"
        placeholder="Enter Reset Code"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Confirm Password"}
      </button>
    </form>
  );
}
