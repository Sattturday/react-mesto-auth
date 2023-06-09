const Input = ({ name, errors, values, handleChange, ...props }) => {
  return (
    <>
      <input
        className={`input${(errors[name] && ' input_type_error') || ''}`}
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        required
        {...props}
      />
      <span className='input__error'>{errors[name]}</span>
    </>
  );
};

export default Input;
