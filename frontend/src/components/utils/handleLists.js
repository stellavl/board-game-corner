import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const updateBoardGameList = async (listType, boardGameId, wasInList) => {

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem("authToken");
    
    if (!userId || !token) {
        toast.error('Πρέπει να συνδεθείτε για να πραγματοποιήσετε αυτήν την ενέργεια.', {
            position: 'top-center'
        });
        return;
    }
    
    try {
        const newValue = !wasInList;

        // Send POST request to backend
        await axiosInstance.post(`/api/user-lists/${userId}`, {
            boardGameId: boardGameId,
            listType: listType,
            //TODO: Check if you want to add or remove the game
            value: newValue // If board game was in list, we want to remove it, otherwise add it 
        },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        toast.success(
            newValue
                ? 'Το επιτραπέζιο προστέθηκε!'
                : 'Το επιτραπέζιο αφαιρέθηκε!',
            { position: 'top-center' }
        );

    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Αποτυχία ενημέρωσης λίστας παιχνιδιών.';
        toast.error(errorMessage, { position: 'top-center' });
    }       
};

  export default updateBoardGameList;
