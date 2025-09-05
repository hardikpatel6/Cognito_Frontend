import React, { useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

export default function Callback() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await fetchAuthSession();
        console.log("✅ Logged in:", session);
        // You can save user info in state/context
      } catch (err) {
        console.error("Login error:", err);
      }
    };
    checkSession();
  }, []);

  return (
    <h3>Redirecting Pls wait...</h3>
  );
}

