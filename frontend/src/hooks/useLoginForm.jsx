import { useState } from 'react';

const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handles input change dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (onSuccess) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API request (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Login successful:', formData);
      onSuccess(); // Close modal on success
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
