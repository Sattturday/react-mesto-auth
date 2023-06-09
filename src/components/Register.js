import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form from './Form';
import Input from './Input';

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleRegister(values);
  }
  useEffect(() => {
    resetForm(true);
  }, [resetForm]);

  return (
    <div className='login'>
      <div className='login__container'>
        <p className='login__title'>Регистрация</p>
        <Form
          name='register'
          buttonText='Зарегистрироваться'
          loadingText='Регистрация...'
          onSubmit={handleSubmit}
          isLoading={app.isLoading}
          isValid={isValid}
        >
          <Input
            name='email'
            type='email'
            placeholder='Email'
            errors={errors}
            values={values}
            handleChange={handleChange}
          />
          <Input
            name='password'
            type='password'
            minLength='6'
            placeholder='Пароль'
            errors={errors}
            values={values}
            handleChange={handleChange}
          />
        </Form>
        <p className='login__subtitle'>
          Уже зарегистрированы? <Link to='/sign-in'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
