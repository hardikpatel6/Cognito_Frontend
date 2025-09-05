
import React from 'react'

const DashBoard = () => {
  const handleLogOut = () => {
    // Logic for logging out the user
    console.log("User logged out");
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