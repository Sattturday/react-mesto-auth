import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import Header from './Header';
import Loading from './Loading';

function Layout({ onLogout }) {
  const app = useContext(AppContext);

  return (
    <>
      <Header onLogout={onLogout} />
      {app.isLoading && !app.loggedIn ? <Loading /> : <Outlet />}
    </>
  );
}

export default Layout;
