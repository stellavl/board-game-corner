import { useState } from 'react';

const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Το email είναι υποχρεωτικό.';
    }
    if (!formData.password) {
      newErrors.password = 'Ο κωδικός είναι υποχρεωτικός.';
    }
    return newErrors;
  };

  const handleSubmit = async (onSuccess) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch {
      setErrors({ form: 'Λανθασμένο email ή κωδικός πρόσβασης. Δοκίμασε ξανά.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
