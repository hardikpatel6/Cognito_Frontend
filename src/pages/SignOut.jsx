import React from 'react';
import { signOut } from 'aws-amplify/auth';

function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut();
      alert("Signed out successfully!");
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