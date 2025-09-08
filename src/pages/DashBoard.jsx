import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          console.log("✅ Logged in user:",storedUser);
        } else {
          navigate("/signin");
        }
      } catch (err) {
        console.error("❌ Session fetch failed:", err);
      }
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("user");
      alert("Signed out successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) return <div>Loading...</div>;
  // Hardik#2511
  return (
    <div>
      <h2>Welcome Hardik Webistes</h2>
      <button onClick={handleLogOut}>Sign Out</button>
    </div>
  );
};

export default DashBoard;