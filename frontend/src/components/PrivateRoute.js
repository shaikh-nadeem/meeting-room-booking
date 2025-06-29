import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  //const { isAuthenticated } = useContext(AuthContext);
  //return isAuthenticated ? children : <Navigate to="/login" replace />;

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
 