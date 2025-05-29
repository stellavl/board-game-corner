import axiosInstance from '../../config/axiosConfig';

export const searchBoardGames = async (searchText, currentPage = 1, pageSize = 8) => {
    const response = await axiosInstance.post('/api/board-game', {
        searchText,
        currentPage,
        pageSize,
    });
    return response.data;
};