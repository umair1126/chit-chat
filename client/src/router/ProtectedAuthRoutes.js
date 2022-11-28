import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedAuthRoute({ children }) {
  const token = localStorage.getItem("token");
  // const admin = localStorage.getItem("admin");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedAuthRoute;
