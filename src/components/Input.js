const Input = ({ name, errors, values, handleChange, ...props }) => {
  return (
    <>
      <input
        className={`popup__input ${
          (errors[name] && 'popup__input_type_error') || ''
        }`}
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        required
        {...props}
      />
      <span className='popup__error'>{errors[name]}</span>
    </>
  );
};

export default Input;
