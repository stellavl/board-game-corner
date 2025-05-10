import axiosInstance from '../../config/axiosConfig';

export const fetchHotBoardGames = async () => {

  try {
    const response = await axiosInstance.get("api/hot-games")
    return response.data;
  } catch (error) {
    return null;
  }
};