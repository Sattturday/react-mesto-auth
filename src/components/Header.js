import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ userEmail, onLogout }) {
  const [showEmail, setShowEmail] = useState(false);
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('');
  const [menuOpen, setMenuOpen] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/react-mesto-auth':
        setShowEmail(true);
        setLink('/sign-in');
        setLinkText('Выйти');
        break;
      case '/sign-in':
        setMenuOpen(false);
        setShowEmail(false);
        setLink('/sign-up');
        setLinkText('Регистрация');
        break;
      case '/sign-up':
        setMenuOpen(false);
        setShowEmail(false);
        setLink('/sign-in');
        setLinkText('Войти');
        break;
      default:
        setMenuOpen(false);
        setShowEmail(false);
        setLink('');
        setLinkText('');
    }
  }, [location]);

  function handleBurgerClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={`header ${(menuOpen && ' header_menu-open') || ''}`}>
      <img className='header__logo' src={logo} alt='Логотип проекта Mesto' />

      {showEmail ? (
        <>
          <div className='header__info'>
            <p className='header__email'>{userEmail}</p>
            <Link
              className='header__link header__link_logout'
              to={link}
              onClick={onLogout}
            >
              {linkText}
            </Link>
          </div>
          <span
            className={`burger ${(menuOpen && ' burger_active') || ''}`}
            onClick={handleBurgerClick}
          >
            <span className='burger__line'></span>
          </span>
        </>
      ) : (
        <Link className='header__link' to={link}>
          {linkText}
        </Link>
      )}
    </header>
  );
}

export default Header;
