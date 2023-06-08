import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';
import Input from './Input';

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      buttonText='Создать'
      loadingText='Создание...'
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <Input
        name='name'
        type='text'
        minLength='2'
        maxLength='30'
        placeholder='Название'
        errors={errors}
        values={values}
        handleChange={handleChange}
      />
      <Input
        name='link'
        type='url'
        placeholder='Ссылка на картинку'
        errors={errors}
        values={values}
        handleChange={handleChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
