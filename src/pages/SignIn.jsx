import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../src/contexts/AuthContext";
import { signin } from "../api/auth";
// import { signInWithRedirect } from "aws-amplify/auth";

export default function Signin() {
  const location = useLocation();
  const emailFromReset = location.state?.email || "";
  const fromReset = location.state?.fromReset || false;

  const [form, setForm] = useState({
    email: emailFromReset,
    password: ""
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // If redirected from reset, auto-fill email once
  useEffect(() => {
    if (emailFromReset) {
      setForm((prev) => ({ ...prev, email: emailFromReset }));
    }
  }, [emailFromReset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signin(form);
      console.log("Signin response:", data);

      login(data); // save user & token to context/localStorage
      alert("✅ Login successful");
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error("Signin error:", err);
      alert(err.response?.data?.error || err.message || "Signin failed");
    }
  };

  // const handleGoogleLogin = (e) => {
  //   signInWithRedirect({ provider: "Google" });
  // }
  return (
    <>
      {/* <button type="button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button> */}
      <form onSubmit={handleSubmit}>
        <h2>Signin</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          readOnly={fromReset} // ✅ editable normally, locked if from reset
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">Signin</button>

        {!fromReset && ( // ✅ only show forgot-password link if it's normal signin
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        )}
      </form>
    </>
  );
}
