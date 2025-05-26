import { 
  createReservationService, 
  getReservationsByUserService,
  getReservationsByCafeService 
} from "../services/reservation-service.js";

export const createReservationController = async (req, res) => {
  try {
    const reservationData = req.body;
    const reservationId = await createReservationService(reservationData);
    res.status(201).json({ reservationId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getReservationsByUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await getReservationsByUserService(userId);
    res.json(reservations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReservationsByCafeController = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await getReservationsByCafeService(userId);
    res.json(reservations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};