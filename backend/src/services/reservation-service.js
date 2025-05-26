import { createReservationRepo, getReservationsByUserRepo } from "../repositories/reservation-repo.js";

export const createReservationService = async (reservationData) => {
  const requiredFields = [
    "date",
    "time",
    "players_no",
    "customer_first_name",
    "customer_last_name",
    "customer_email",
    "customer_phone",
    "board_game_cafe_id"
  ];

  const fieldNames = {
    date: "Ημερομηνία",
    time: "Ώρα",
    players_no: "Αριθμός παικτών",
    customer_first_name: "Όνομα πελάτη",
    customer_last_name: "Επώνυμο πελάτη",
    customer_email: "Email πελάτη",
    customer_phone: "Τηλέφωνο πελάτη",
    board_game_cafe_id: "ID καφέ"
  };

  for (const field of requiredFields) {
    if (
      reservationData[field] === undefined ||
      reservationData[field] === null ||
      reservationData[field] === ""
    ) {
      throw new Error(`Λείπει το απαιτούμενο πεδίο: ${fieldNames[field] || field}`);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservationData.customer_email)) {
    throw new Error("Μη έγκυρη μορφή email");
  }

  if (!/^\d{10}$/.test(reservationData.customer_phone)) {
    throw new Error("Μη έγκυρη μορφή αριθμού τηλεφώνου");
  }

  const reservationWithStatus = { ...reservationData, status: "Αναμονή για επιβεβαίωση" };
  return await createReservationRepo(reservationWithStatus);
};

export const getReservationsByUserService = async (userId) => {
  if (!userId) {
    throw new Error("Δεν επιτρέπεται η πρόσβαση. Απαιτείται σύνδεση.");
  }
  return await getReservationsByUserRepo(userId);
};