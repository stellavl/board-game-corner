import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import BoardGameGroup from "./BoardGameGroup";
import OrangeButton from "../common/OrangeButton";
import EditableField from "../common/EditableField";
import { toast } from "react-toastify";

const MainTab = ({ user, setUser }) => {
    const [favorites, setFavorites] = useState([]);
    const [played, setPlayed] = useState([]);
    const [wantToPlay, setWantToPlay] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("authToken");
        
        if (!userId || !token) {
            return;
        }

        const fetchUserBoardGamesLists = async () => {
            try {
                const response = await axiosInstance.get(`/api/user-lists/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const allGames = response.data;
                const favoritesList = [];
                const playedList = [];
                const wantToPlayList = [];

                allGames.forEach(game => {
                    const gameData = {
                        id: game.board_game_id,
                        name: game.board_game_name,
                        image: game.board_game_image
                    };
                    if (game.is_favorite) favoritesList.push(gameData);
                    if (game.is_have_played) playedList.push(gameData);
                    if (game.is_want_to_play) wantToPlayList.push(gameData);
                });
                setFavorites(favoritesList);
                setPlayed(playedList);
                setWantToPlay(wantToPlayList);
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Αποτυχία εύρεσης λίστας παιχνιδιών.';
                toast.error(errorMessage, { position: 'top-center' });
            }
    }
    fetchUserBoardGamesLists();
  }, []);

   return (
        <>
            <div className="border-1 p-4 rounded-3" style={{ borderColor: "var(--color-orange)" }}>
                <div className="row g-4 mx-auto" style={{ maxWidth: "50rem" }}>
                    {[
                        { label: "Όνομα", key: "first_name" },
                        { label: "Επώνυμο", key: "last_name" },
                        { label: "Email", key: "email" },
                        { label: "Τηλέφωνο Επικοινωνίας", key: "phone_number" },
                    ].map(({ label, key }) => (
                        <EditableField 
                            key={key} 
                            label={label} 
                            fieldKey={key} 
                            user={user} 
                            setUser={setUser} 
                        />
                    ))}
                </div>

                <div className="text-end m-4">
                    <OrangeButton text="Αλλαγή κωδικού" size="btn-sm" />
                </div>
            </div>

            <BoardGameGroup title="Αγαπημένα:" boardGames={favorites} widthSize="60%"/>
            <div className="row g-4 mt-6">
                <div className="col-12 col-md-6">
                    <BoardGameGroup title="Έχω παίξει:" boardGames={played} />
                </div>
                <div className="col-12 col-md-6">
                    <BoardGameGroup title="Θέλω να παίξω:" boardGames={wantToPlay} />
                </div>
            </div>
        </>
    );
};

export default MainTab;