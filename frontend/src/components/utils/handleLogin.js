import { toast } from 'react-toastify';
import axiosInstance from '../../config/axiosConfig';

export const loginPersonal = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/login/personal', {
      email: formData.email,
      password: formData.password,
      role: 'USER'
    });

    const { user, token } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', user.id);

    return { success: true, userId: user.id };
  } catch (error) {
    return handleLoginError(error);
  }
};

export const loginAdmin = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/login/admin', {
      email: formData.email,
      password: formData.password,
      role: 'ADMIN'
    });

    const { admin, token } = response.data;

    // localStorage.setItem('authToken', token);
    // localStorage.setItem('userId', user.id);

    return { success: true, adminId: admin.id };
  } catch (error) {
    return handleLoginError(error);
  }
};

const handleLoginError = (error) => {
  let errorMessage = 'Σφάλμα κατά τη σύνδεση. Προσπαθήστε ξανά.';
  if (error.code === 'ERR_NETWORK') {
    errorMessage = 'Ο διακομιστής δεν αποκρίνεται. Προσπαθήστε ξανά αργότερα.';
    toast.error(errorMessage, { position: 'top-center' });
  } else if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500 &&
    error.response.data &&
    error.response.data.error
  ) {
    errorMessage = error.response.data.error;
  } else {
    toast.error(errorMessage, { position: 'top-center' });
  }

  return { success: false, error: errorMessage };
};