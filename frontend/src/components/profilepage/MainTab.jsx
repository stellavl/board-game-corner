import BoardGameGroup from "./BoardGameGroup";
import OrangeButton from "../common/OrangeButton";
import EditableField from "../common/EditableField"; 

const favorites = ["Catan", "Ticket to ride", "Jungle Speed", "Dixit"];
const played = ["Catan", "Ticket to ride", "Jungle Speed", "Dixit"];
const wantToPlay = ["Catan", "Ticket to ride", "Jungle Speed", "Dixit"];

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

            <BoardGameGroup title="Αγαπημένα:" games={favorites} />
            <div className="grid grid-cols-2 gap-4 mt-6">
                <BoardGameGroup title="Έχω παίξει:" games={played} />
                <BoardGameGroup title="Θέλω να παίξω:" games={wantToPlay} />
            </div>
        </>
    );
};

export default MainTab;