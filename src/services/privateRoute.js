// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Home } from '../pages/home/home';

const PrivateRoute = ({children}) => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? children : <Navigate to={'/login'} />

};

export {PrivateRoute};