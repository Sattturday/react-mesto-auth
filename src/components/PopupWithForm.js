import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Popup from './Popup';
import Form from './Form';

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
      <Form
        name={name}
        buttonText={buttonText}
        loadingText={loadingText}
        onSubmit={onSubmit}
        isLoading={app.isLoading}
        isValid={isValid}
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
