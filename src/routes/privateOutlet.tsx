import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateOutlet: React.FC = () => {
  const { 
    isAuthenticated, 
} = useAuth();

const queryParams = { q: 'unauthorized' };
const queryString = new URLSearchParams(queryParams).toString();
return isAuthenticated ? <Outlet /> : <Navigate to={`/?${queryString}`} />;
};

export default PrivateOutlet;
