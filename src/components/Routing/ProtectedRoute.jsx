import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { getUser } from '../Services/userServices';

const ProtectedRoute = () => {
    const location = useLocation();

  return getUser() ? <Outlet></Outlet> : <Navigate to="/login" state={{from:location.pathname}}></Navigate>
}

export default ProtectedRoute