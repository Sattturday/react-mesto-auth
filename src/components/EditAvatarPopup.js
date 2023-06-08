import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name='add-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      loadingText='Сохранение...'
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <Input
        name='avatar'
        type='url'
        placeholder='https://somewebsite.com/someimage.jpg'
        errors={errors}
        values={values}
        handleChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
