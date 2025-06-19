import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role, requiredRole }) => {
  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
