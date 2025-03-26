import BoardGameGroup from "./BoardGameGroup";
import OrangeButton from "../common/OrangeButton";
import EditableField from "../common/EditableField"; 

const favorites = [
    { id: 1, name: "Catan", image: '/boardgamephotos/catan.png' },
    { id: 2, name: "Ticket to ride", image: "/images/ticket-to-ride.jpg" },
    { id: 3, name: "Jungle Speed", image: "/images/jungle-speed.jpg" },
    { id: 4, name: "Dixit", image: "/images/dixit.jpg" }
];

const played = [
    { id: 1, name: "Catan", image: "/images/catan.jpg" },
    { id: 2, name: "Ticket to ride", image: "/images/ticket-to-ride.jpg" },
    { id: 3, name: "Jungle Speed", image: "/images/jungle-speed.jpg" },
    { id: 4, name: "Dixit", image: "/images/dixit.jpg" }
];

const wantToPlay = [
    { id: 1, name: "Catan", image: "/images/catan.jpg" },
    { id: 2, name: "Ticket to ride", image: "/images/ticket-to-ride.jpg" },
    { id: 3, name: "Jungle Speed", image: "/images/jungle-speed.jpg" },
    { id: 4, name: "Dixit", image: "/images/dixit.jpg" }
];

const MainTab = ({ editedUser, setEditedUser }) => {
    
    return (
        <>
            <div className="border-1 p-4 rounded-3" style={{ borderColor: "var(--color-orange)" }}>
                <div className="row g-4 mx-auto" style={{ maxWidth: "50rem" }}>
                    {[
                        { label: "Όνομα", key: "firstName" },
                        { label: "Επώνυμο", key: "lastName" },
                        { label: "Email", key: "email" },
                        { label: "Τηλέφωνο Επικοινωνίας", key: "phone" },
                    ].map(({ label, key }) => (
                        <EditableField 
                            key={key} 
                            label={label} 
                            fieldKey={key} 
                            editedUser={editedUser} 
                            setEditedUser={setEditedUser} 
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