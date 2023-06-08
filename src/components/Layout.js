import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import Header from './Header';
import Loading from './Loading';

function Layout({ loggedIn, userEmail, onLogout }) {
  const app = useContext(AppContext);

  return (
    <>
      <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={onLogout} />
      {app.isLoading ? <Loading /> : <Outlet />}
    </>
  );
}

export default Layout;
