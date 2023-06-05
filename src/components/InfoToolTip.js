import { usePopupClose } from '../hooks/usePopupClose';

function InfoTooltip(message, onClose) {
  usePopupClose(message, onClose);

  return (
    <div className={`popup ${message && ' popup_opened'}`}>
      <button className='popup__close' type='button' onClick={onClose} />
      <img className='popup__image-login' src='' alt='Индикатор входа' />
      <p className='popup__title'>{message}</p>
    </div>
  );
}

export default InfoTooltip;
