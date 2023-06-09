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
    <form
      className={`form form_type_${name}`}
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
      <button
        className={`form__submit ${
          (!isValid && ' form__submit_disabled') || ''
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
