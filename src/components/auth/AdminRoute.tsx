import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute Guard Component
 * Secures routing zones restricted strictly to Admin users.
 * Validates initialization state, user session presence, and custom claims profile attributes.
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, role, loading } = useAuthStore();
  const location = useLocation();

  // Handle Firebase active session connection lookup overhead delay gracefully
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-darkBg transition-colors">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // If user is unauthenticated or does not possess verified admin role claims, redirect with firewall safety
  if (!user || role !== 'admin') {
    console.warn(`Unauthorized access attempt to admin panel blocked for: ${user?.email || 'Anonymous'}`);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authorize layout rendering tree execution if all criteria match perfectly
  return <>{children}</>;
};

export default AdminRoute;
