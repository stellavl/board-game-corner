import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../components/utils/fetchUser";
import MainTab from "../components/profilepage/MainTab";
import ReservationsTab from "../components/profilepage/ReservationsTab";
import { toast } from "react-toastify";

const Profile = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);

  const [activeTab, setActiveTab] = useState("main");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const userData = await fetchUser(userId);
      if (userData) {
        setUser(userData);
      } else {
        toast.error("User not found.", { position: "top-center" });
      }
      setLoading(false);
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return null;
  }

  return (
    <div className="container p-5">
          <h2 className="text-center fw-bold" style={{ color: "var(--color-orange)" }}>
            {user.first_name} {user.last_name}
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
            <MainTab user={user} setUser={setUser} />
          ) : (
            <ReservationsTab />
          )}
    </div>
  );
};

export default Profile;
