import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='login'>
      <div className='login__form'>
        <h3 className='login__title'>
          <span>404</span> - cтраница не найдена
        </h3>
        <p className='login__subtitle'>Ой, здесь ничего нет</p>
        <Link className='login__button' to='/sign-in'>
          Назад
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
