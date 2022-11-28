import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
