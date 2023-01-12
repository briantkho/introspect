import React, { useEffect } from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { Card } from './components/Card';
import Sidebar from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';

// const request = async () => {
//   const url = 'http://localhost:3030';
//   const response = await fetch(url);
//   const data = response.json();

//   return data;
// };

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  return <div className="dark:bg-dark-bg bg-white-bg">{routes}</div>;
};

export default App;
