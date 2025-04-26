import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

export const fetchUser = async (userId) => {

  const token = localStorage.getItem('authToken');

  if (!userId || !token) {
    toast.error('Αποτυχία φόρτωσης δεδομένων χρήστη.', { position: 'top-center' });
    return null;
  }

  try {
    const response = await axiosInstance.get(`api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      toast.error('Σφάλμα κατά την ανάκτηση των στοιχείων.', { position: 'top-center' });
      return null;
    }

    return response.data;
  } catch (error) {
    toast.error('Αποτυχία φόρτωσης δεδομένων χρήστη.', { position: 'top-center' });
    return null;
  }
};