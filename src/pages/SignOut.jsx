import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";
function SignOut() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signed out successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h3>Sign Out</h3>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;