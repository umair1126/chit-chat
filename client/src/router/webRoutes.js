import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedAuthRoute from "./ProtectedAuthRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Loader from "../components/Loader/Lodaer";

import Chat from "../components/Chat/Index";
import Signup from "../components/Auth/Signup/Signup";
import Signin from "../components/Auth/Signin/Signin";

export default function AppRoutes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <ProtectedAuthRoute>
              <Signin />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <Signup />
            </ProtectedAuthRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
}
