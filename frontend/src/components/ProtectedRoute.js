import React, { useState, useEffect } from "react"; // Added useState import
import { Navigate, useLocation } from "react-router-dom"; // Added useLocation
import axios from "axios";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation(); // Proper way to access location

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsValidating(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/validate", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (adminOnly && !response.data.user.isAdmin) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("token");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [adminOnly]);

  if (isValidating) {
    return <div className="auth-loading">Verifying session...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;