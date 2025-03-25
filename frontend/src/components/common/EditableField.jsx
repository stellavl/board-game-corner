import { useState } from "react";
import { Pencil, CheckCircle, XCircle } from "react-bootstrap-icons";
import { validatePersonalData } from "../../components/utils/validations";

const EditableField = ({ label, fieldKey, editedUser, setEditedUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(editedUser[fieldKey]);
    const [error, setError] = useState("");

    const handleEditClick = () => {
        setIsEditing(true);
        setTempValue(editedUser[fieldKey]);
    };

    const handleSaveClick = () => {
        const updatedUser = { ...editedUser, [fieldKey]: tempValue };
        const fieldErrors = validatePersonalData(updatedUser, fieldKey);

        if (!fieldErrors[fieldKey]) {
            setEditedUser(updatedUser);
            setIsEditing(false);
            setError("");
        } else {
            setError(fieldErrors[fieldKey]);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setTempValue(editedUser[fieldKey]);
        setError("");
    };

    return (
        <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center">
                <label className="fw-bold mb-2" style={{ color: "var(--color-orange)" }}>
                    {label}:
                </label>
            </div>
            <div style={{ position: "relative" }}>
                <input
                    type="text"
                    className={`form-control border-1 ${isEditing ? "editable" : ""}`}
                    value={isEditing ? tempValue : editedUser[fieldKey]}
                    onChange={(e) => setTempValue(e.target.value)}
                    disabled={!isEditing}
                    style={{
                        backgroundColor: isEditing ? "var(--color-soft-orange)" : "transparent",
                        borderColor: "var(--color-orange)",
                        paddingRight: "5rem",
                    }}
                />
                {isEditing ? (
                    <>
                        <CheckCircle
                            className="position-absolute"
                            style={{
                                right: "0.5rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--color-gray-purple)",
                                cursor: "pointer",
                            }}
                            onClick={handleSaveClick}
                        />
                        <XCircle
                            className="position-absolute"
                            style={{
                                right: "2rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--color-gray-purple)",
                                cursor: "pointer",
                            }}
                            onClick={handleCancelClick}
                        />
                    </>
                ) : (
                    <Pencil
                        className="position-absolute"
                        style={{
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-orange)",
                            cursor: "pointer",
                        }}
                        onClick={handleEditClick}
                    />
                )}
                {/* Error message */}
                {error && (
                    <div
                        className="invalid-feedback d-block"
                        style={{ fontSize: "0.875rem", position: "absolute", bottom: "-1.5rem", left: "0" }}
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditableField;
