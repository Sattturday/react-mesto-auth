import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';
import { login } from '../utils/auth';

function Login({ handleLogin }) {
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    login(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin(data.email);
          navigate('/react-mesto-auth');
          return data;
        } else {
          return;
        }
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
        <p className='login__title'>Вход</p>
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
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
