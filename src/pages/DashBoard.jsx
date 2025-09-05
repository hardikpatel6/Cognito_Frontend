
import React from 'react'
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
const DashBoard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkSession() {
      try {
        const session = await fetchAuthSession();
        if (session.tokens) {
          setUser(session.tokens.idToken?.payload);
          console.log("✅ Logged in user:", session);
        }
      } catch (err) {
        console.error("❌ Session fetch failed:", err);
      }
    }
    checkSession();
  }, []);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
          await signOut({global:true});
          alert("Signed out successfully!");
          navigate("/signin");
        } catch (error) {
          console.error("Logout error:", error);
        }
  }
  
  if(!user) return <div>Loading...</div>

    return (
      <div>
        <h2>Hello World and Hello Hardik</h2>
        <button onClick={handleLogOut}>SignOut</button>
      </div>
    )
}

export default DashBoard