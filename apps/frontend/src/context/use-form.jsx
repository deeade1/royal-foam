import { useState, useRef } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [isValidated, setIsValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const onChange = (event) => {
    const { name, type, files, value } = event.target;
    if (type === "file") {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      callback();
    }

    setIsValidated(true);
  };

  return {
    onChange,
    onSubmit,
    values,
    formRef,
    isValidated,
    errors,
    setErrors,
  };
};
