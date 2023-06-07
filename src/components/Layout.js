import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ userEmail, onLogout }) {
  return (
    <>
      <Header userEmail={userEmail} onLogout={onLogout} />
      <Outlet />
    </>
  );
}

export default Layout;
