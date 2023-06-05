import { Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ userEmail, link, linkText, onLogout }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип проекта Mesto' />
      <div className='header__info'>
        <p className='header__email'>{userEmail}</p>
        <Link className='header__link' to={link} onClick={onLogout}>
          {linkText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
