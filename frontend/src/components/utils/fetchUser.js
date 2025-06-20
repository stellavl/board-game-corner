import axiosInstance from '../../config/axiosConfig';

export const fetchUser = async (userId) => {

  const token = localStorage.getItem('authToken');

  if (!userId || !token) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    return null;
  }

  try {
    const response = await axiosInstance.get(`/api/basic-users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};