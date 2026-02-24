import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedDashboardRoute = ({ children }) => {
  const { number, isLoggedIn, user, data } = useSelector((state) => state.auth);
  const ALLOWED_USER_IDS = ["0004086", "0003595"];
  const serviceNo = String(
    user?.ServiceNo || data?.[0]?.ServiceNo || number || "",
  ).trim();
  const canAccessDashboard = ALLOWED_USER_IDS.includes(serviceNo);

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in but user not in allowed list, redirect to home
  if (!canAccessDashboard) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedDashboardRoute;
