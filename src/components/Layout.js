import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout({ loggedIn, userEmail, onLogout }) {
  return (
    <>
      <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={onLogout} />
      <Outlet />
    </>
  );
}

export default Layout;
