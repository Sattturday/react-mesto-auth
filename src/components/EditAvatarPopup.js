import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import { useValidation } from '../hooks/useValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  // const avatarRef = useRef();
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});

  useEffect(() => {
    setValues({ avatar: '' });
    setIsValid(false);
    setErrors({});
  }, [setValues, setIsValid, setErrors, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values);
  }

  // useEffect(() => {
  //   avatarRef.current.value = '';
  // }, [isOpen]);

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onUpdateAvatar({
  //     avatar: avatarRef.current.value,
  //   });
  // }

  return (
    <PopupWithForm
      name='add-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      loadingText='Сохранение...'
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        className={`popup__input ${
          (errors.avatar && 'popup__input_type_error') || ''
        }`}
        name='avatar'
        type='url'
        placeholder='https://somewebsite.com/someimage.jpg'
        value={values.avatar || ''}
        //       ref={avatarRef}
        onChange={handleChange}
        required
      />
      <span className='popup__error'>{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
