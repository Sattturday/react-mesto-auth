import { usePopupClose } from '../hooks/usePopupClose';
import imgError from '../images/popup__error.svg';
import imgSuccess from '../images/popup__success.svg';

function InfoTooltip({ message, onClose }) {
  usePopupClose(message, onClose);

  const linkImage = message?.isSuccess ? imgSuccess : imgError;

  return (
    <div
      className={`popup popup_for_info ${(message && ' popup_opened') || ''}`}
    >
      <div className='popup__container'>
        <button className='popup__close' type='button' onClick={onClose} />
        <img
          className='popup__image-login'
          src={linkImage}
          alt={message?.text}
        />
        <p className='popup__title popup__title_info'>{message?.text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
