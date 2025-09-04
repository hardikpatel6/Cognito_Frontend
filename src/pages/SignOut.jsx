import React from 'react';

function SignOut() {
  const handleSignOut = () => {
    // Call API for sign-out
    console.log('Sign Out');
  };

  return (
    <div>
      <h3>Sign Out</h3>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;