import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OrangeButton from "./OrangeButton";  
import { useNavigate } from "react-router-dom";

const BackButton = ({ text = "Επιστροφή" }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <OrangeButton
            text={
                <span className="d-inline-flex align-items-center text-nowrap">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {text}
                </span>
            }
            className="text-decoration-none position-relative top-3 start-3"
            onClick={handleGoBack}
            size="btn-sm"
        />
    );
};

export default BackButton;
