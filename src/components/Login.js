import { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form from './Form';
import Input from './Input';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const app = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(values);
  }

  useEffect(() => {
    resetForm(true);
  }, [resetForm]);

  return (
    <div className='login'>
      <div className='login__container'>
        <p className='login__title'>Вход</p>
        <Form
          name='login'
          buttonText='Войти'
          loadingText='Вход...'
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
      </div>
    </div>
  );
}

export default Login;
