import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});

  useEffect(() => {
    setValues({ name: '', link: '' });
    setIsValid(false);
    setErrors({});
  }, [setValues, setIsValid, setErrors, isOpen]);

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
      <input
        className={`popup__input ${
          (errors.name && 'popup__input_type_error') || ''
        }`}
        name='name'
        type='text'
        minLength='2'
        maxLength='30'
        placeholder='Название'
        value={values.name || ''}
        onChange={handleChange}
        required
      />
      <span className='popup__error'>{errors.name}</span>
      <input
        className={`popup__input ${
          (errors.link && 'popup__input_type_error') || ''
        }`}
        name='link'
        required
        type='url'
        placeholder='Ссылка на картинку'
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className='popup__error'>{errors.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
