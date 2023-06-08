import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsValid(true);
    setErrors({});
  }, [setValues, setIsValid, setErrors, currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      loadingText='Сохранение...'
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <input
        className={`popup__input ${
          (errors.name && 'popup__input_type_error') || ''
        }`}
        name='name'
        type='text'
        minLength='2'
        maxLength='40'
        placeholder='Имя'
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__error'>{errors.name}</span>
      <input
        className={`popup__input ${
          (errors.about && 'popup__input_type_error') || ''
        }`}
        name='about'
        type='text'
        minLength='2'
        maxLength='200'
        placeholder='Род деятельности'
        value={values.about || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__error'>{errors.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
