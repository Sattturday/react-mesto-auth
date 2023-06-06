import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ userEmail, onLogout }) {
  const [showEmail, setShowEmail] = useState(false);
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/react-mesto-auth':
        setShowEmail(true);
        setLink('/sign-in');
        setLinkText('Выйти');
        break;
      case '/sign-in':
        setLink('/sign-up');
        setLinkText('Регистрация');
        break;
      case '/sign-up':
        setLink('/sign-in');
        setLinkText('Войти');
        break;
      default:
        setLink('');
        setLinkText('');
    }
  }, [location]);

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип проекта Mesto' />
      <div className='header__info'>
        <p className='header__email'>{showEmail && userEmail}</p>
        <Link
          className={`header__link ${
            (showEmail && ' header__link_logout') || ''
          }`}
          to={link}
          onClick={showEmail && onLogout}
        >
          {linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
