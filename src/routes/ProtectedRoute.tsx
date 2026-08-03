import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../utils/routes";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  userRole?: string;
  isAuthenticated?: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  userRole = "guest",
  isAuthenticated = true,
  redirectTo = ROUTES.AUTH.LOGIN,
  children,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
