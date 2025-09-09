import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      console.log("Fetched user from localStorage:", storedUser);
      if (storedUser) {
        setUser(storedUser);
        console.log("✅ Logged in user:", storedUser);
      }
    } catch (err) {
      console.error("❌ Session fetch failed:", err);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("user");
      await signOut();
      setUser(null);
      console.log("✅ User signed out");
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
      <div>
        <h2>
          Welcome{" "}
          {user.email
            ? user.email
            : user.username
              ? user.username
              : "User"}
        </h2>
        {user.provider && <p>Signed in with: {user.provider}</p>}
      </div>
      <button onClick={handleLogOut}>Sign Out</button>
    </div>
  );
};

export default DashBoard;