import { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useValidation } from '../hooks/useValidation';

function Login({ handleLogin }) {
  const { isValid, setIsValid, errors, setErrors, validateForm } =
    useValidation();
  const { values, handleChange, setValues } = useForm(validateForm, {});

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(values);
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
            minLength='6'
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
            disabled={!isValid}
          >
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
