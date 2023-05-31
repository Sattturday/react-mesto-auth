import { useState } from 'react';

export function useValidation() {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  function validateForm(event) {
    const { name, validationMessage } = event.target;
    const checkValidate = event.target.closest('form').checkValidity();

    if (checkValidate) {
      setErrors({
        ...errors,
        [name]: '',
      });
      setIsValid(true);
    } else {
      setErrors({
        ...errors,
        [name]: validationMessage,
      });
      setIsValid(false);
    }
  }

  return { isValid, setIsValid, errors, setErrors, validateForm };
}
