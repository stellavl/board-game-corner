import React, { useState } from "react";
import { useParams } from "react-router-dom";
import users from "../data/users";
import MainTab from "../components/profilepage/MainTab";
import ReservationsTab from "../components/profilepage/ReservationsTab";

const Profile = () => {
  const { firstName, lastName } = useParams();
  const user = users.find(
    (user) =>
      user.firstName.toLowerCase() === firstName.toLowerCase() &&
      user.lastName.toLowerCase() === lastName.toLowerCase()
  );

  const [editedUser, setEditableUser] = useState(user);
  const [activeTab, setActiveTab] = useState("main");

  return (
    <>
      {user ? (
        <div className="container p-5">
          <h2 className="text-center fw-bold" style={{ color: "var(--color-orange)" }}>
            {editedUser.firstName} {editedUser.lastName}
          </h2>

          {/* Tabs */}
          <div className="text-center m-3">
            <a
              href="#"
              className={`mx-2 ${activeTab === "main" ? "text-decoration-underline" : "text-decoration-none"}`}
              style={{ color: "var(--color-gray-purple)" }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("main");
              }}
            >
              Προφίλ
            </a>
            |
            <a
              href="#"
              className={`mx-2 ${activeTab === "reservations" ? "text-decoration-underline" : "text-decoration-none"}`}
              style={{ color: "var(--color-gray-purple)" }}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("reservations");
              }}
            >
              Κρατήσεις
            </a>
          </div>
          <hr className="mx-auto mt-2" style={{ width: "25%", border: "1px solid var(--color-orange)" }} />

          {/* Render the appropriate tab */}
          {activeTab === "main" ? (
            <MainTab editedUser={editedUser} setEditedUser={setEditableUser} />
          ) : (
            <ReservationsTab />
          )}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </>
  );
};

export default Profile;
