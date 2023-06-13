import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='not-found'>
      <Link className='not-found__button' to='/sign-in'>
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
