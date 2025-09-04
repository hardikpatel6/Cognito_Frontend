import React, { useState } from "react";
import { signup } from "../api/auth";   // your API function
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const res = await signup(form); // call API
      localStorage.setItem("signupEmail", form.email); // store email for confirmation
      alert("✅ Signup successful. Please verify your email.");
      navigate("/confirm", { state: {email: form.email } }); // redirect after signup
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button type="submit">Signup</button>
    </form>
  );
}

