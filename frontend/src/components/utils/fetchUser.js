import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

export const fetchUser = async (userId) => {
  if (!userId) {
    toast.error('Αποτυχία φόρτωσης δεδομένων χρήστη.', { position: 'top-center' });
    return null;
  }

  try {
    const token = localStorage.getItem('authToken');
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