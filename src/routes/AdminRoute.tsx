import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute Guard
 * Restricts access to Admin-only dashboards and operations.
 * Non-admins are redirected back to the homepage.
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-darkBg">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Check if user is authenticated and has the 'admin' role
  if (!user || user.role !== 'admin') {
    // Redirect unauthorized users to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
