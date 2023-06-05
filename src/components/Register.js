import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import { register } from '../utils/auth';

function Register(onSubmit) {
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    register(values)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => setErrorMessage(err));
  }

  useEffect(() => {
    setValues({ email: '', password: '' });
    setIsValid(true);
    setErrors({});
  }, [setValues, setIsValid, setErrors]);

  return (
    <div className='login'>
      <form
        className='login__form'
        name='login'
        onSubmit={handleSubmit}
        noValidate
      >
        <p className='login__title'>Регистрация</p>
        <span className='login__error'>{errorMessage}</span>
        <fieldset className='login__items'>
          <input
            className='login__input'
            name='email'
            type='email'
            placeholder='Email'
            value={values.email || ''}
            onChange={handleChange}
            required
          />
          <span className='login__error'>{errors.email}</span>
          <input
            className='login__input'
            name='password'
            type='password'
            minLength='8'
            placeholder='Пароль'
            value={values.password || ''}
            onChange={handleChange}
            required
          />
          <span className='login__error'>{errors.password}</span>
          <button
            className={`login__button ${
              (!isValid && ' login__button_disabled') || ''
            }`}
            type='submit'
          >
            Зарегистрироваться
          </button>
          <p className='login__subtitle'>
            Уже зарегистрированы? <Link to='/sign-in'>Войти</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
