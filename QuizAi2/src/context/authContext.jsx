import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // In
// stall: npm install jwt-decode
import { login } from "../utils/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(true); // Prevent premature redirect

  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Stop loading after checking localStorage
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const res = await login({ email, password });
      console.log("Login Response:", res); // Debug the response

      // Save token and user to localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // Update user state
      setUser(res.user);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("user"); // Clear user data
    setUser(null); // Clear user state
    navigate("/"); // Redirect to home
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);