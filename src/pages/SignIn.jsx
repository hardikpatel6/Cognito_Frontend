import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../src/contexts/AuthContext";
import { signin } from "../api/auth";
import { signInWithRedirect,fetchAuthSession,getCurrentUser } from "aws-amplify/auth";

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

      const basicUserData = {
        email: data.email || form.email,
        username: data.username || form.email.split("@")[0],
        provider: "Basic",
        token: data.token ||null
      }
      login(basicUserData); // save user & token to context/localStorage
      localStorage.setItem("user", JSON.stringify(basicUserData)); // persist user data
      alert("✅ Login successful");
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      console.error("Signin error:", err);
      alert(err.response?.data?.error || err.message || "Signin failed");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        await signInWithRedirect({ provider: "Google" });
      } else {
        console.log("Already signed in:", session);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  useEffect(() => {
    const checkGoogleRedirect = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens) {
          const user = await getCurrentUser();
          console.log("Google user:", user);

          // Normalize for Dashboard (store email, username, etc.)
          const googleUserData = {
            email: user.signInDetails?.loginId,
            username: user.username,
            provider: "Google",
          };

          login(googleUserData);
          localStorage.setItem("user", JSON.stringify(googleUserData));
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Google redirect check failed:", err);
      }
    };

    checkGoogleRedirect();
  }, [login, navigate]);
  return (
    <>
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
      <br></br>
      <br></br>
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
