import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm(true);
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [setValues, resetForm, currentUser, isOpen]);

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
      <Input
        name='name'
        type='text'
        minLength='2'
        maxLength='40'
        placeholder='Имя'
        errors={errors}
        values={values}
        handleChange={handleChange}
      />
      <Input
        name='about'
        type='text'
        minLength='2'
        maxLength='200'
        placeholder='Род деятельности'
        errors={errors}
        values={values}
        handleChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
