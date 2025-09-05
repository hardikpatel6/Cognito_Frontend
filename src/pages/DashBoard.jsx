
import React from 'react'
import { signInWithRedirect, signOut } from "aws-amplify/auth";
const DashBoard = () => {
  const handleLogOut = async () => {
    try {
          await signOut();
          alert("Signed out successfully!");
        } catch (error) {
          console.error("Logout error:", error);
        }
  }
  return (
    <div>
      <h2>Hello World and Hello Hardik</h2>
      <button
      onClick={handleLogOut}>SignOut</button>
    </div>
  )
}

export default DashBoard