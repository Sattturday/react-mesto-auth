import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Popup from './Popup';

function PopupWithForm({
  name,
  title,
  buttonText,
  loadingText,
  onSubmit,
  isOpen,
  isValid,
  children,
}) {
  const app = useContext(AppContext);

  return (
    <Popup isOpen={isOpen} name={name} onClose={app.closeAllPopups}>
      <p className='popup__title'>{title}</p>
      <form className='popup__items' name={name} onSubmit={onSubmit} noValidate>
        {children}
        <button
          className={`popup__button ${
            (!isValid && ' popup__button_disabled') || ''
          }`}
          type='submit'
          disabled={!isValid}
        >
          {app.isLoading ? loadingText : buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
