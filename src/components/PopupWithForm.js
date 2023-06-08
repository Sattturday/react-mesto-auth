import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';

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
  usePopupClose(isOpen, app.closeAllPopups);

  return (
    <div className={`popup popup_for_${name} ${isOpen && ' popup_opened'}`}>
      <form
        className='popup__container'
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        <button
          className='popup__close'
          type='button'
          onClick={app.closeAllPopups}
        />
        <p className='popup__title'>{title}</p>
        <fieldset className='popup__items'>
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
        </fieldset>
      </form>
    </div>
  );
}

export default PopupWithForm;
