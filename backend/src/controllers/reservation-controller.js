import { createReservationService } from "../services/reservation-service.js";

export const createReservationController = async (req, res) => {
  try {
    const reservationData = req.body;
    const reservationId = await createReservationService(reservationData);
    res.status(201).json({ reservationId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};