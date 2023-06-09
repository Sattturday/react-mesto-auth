import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import imgError from '../images/popup__error.svg';
import imgSuccess from '../images/popup__success.svg';
import Popup from './Popup';

function InfoTooltip({ message }) {
  const app = useContext(AppContext);

  const linkImage = message?.isSuccess ? imgSuccess : imgError;

  return (
    <Popup isOpen={message} name='info' onClose={app.closeAllPopups}>
      <img className='popup__icon-info' src={linkImage} alt={message?.text} />
      <p className='popup__title popup__title_info'>{message?.text}</p>
    </Popup>
  );
}

export default InfoTooltip;
