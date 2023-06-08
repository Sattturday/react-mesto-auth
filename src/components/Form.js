const Form = ({
  name,
  buttonText,
  loadingText,
  onSubmit,
  isLoading,
  isValid,
  children,
}) => {
  return (
    <form className='popup__items' name={name} onSubmit={onSubmit} noValidate>
      {children}
      <button
        className={`popup__button ${
          (!isValid && ' popup__button_disabled') || ''
        }`}
        type='submit'
        disabled={!isValid}
      >
        {isLoading ? loadingText : buttonText}
      </button>
    </form>
  );
};

export default Form;
