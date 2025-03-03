import React from 'react';
import { Navigate } from 'react-router-dom';

{/* ProtectedRoute - проверка на наличие токена в целях ограничения доступа */}
const ProtectedRoute = ({ token, children }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
      }
      return children;
    };
export default ProtectedRoute;