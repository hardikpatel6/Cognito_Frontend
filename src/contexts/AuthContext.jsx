import { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
// ❌ remove: import { useNavigate } from "react-router-dom";

// ...
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signUp = (userData) => {
    setUser(userData);
    localStorage.setItem("signupEmail", email);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    window.location.href = "/signin"; // ✅ safe redirect
  };

  return (
    <AuthContext.Provider value={{ user,signUp, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}



