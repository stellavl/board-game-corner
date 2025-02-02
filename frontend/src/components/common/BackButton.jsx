// BackButton.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OrangeButton from "./OrangeButton";  
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    // Handle going back to the previous page
    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <OrangeButton
            text={
                <>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Επιστροφή στα επιτραπέζια
                </>
            }
            className="text-decoration-none position-relative top-3 start-3" 
            onClick={handleGoBack}
            size="btn-sm"
        />
    );
};

export default BackButton;
