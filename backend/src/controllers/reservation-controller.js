import { 
  createReservationService, 
  getReservationsByUserService,
  getReservationsByCafeService,
  updateReservationStatusService 
} from "../services/reservation-service.js";

export const createReservationController = async (req, res) => {
  try {
    const reservationData = req.body;
    const { reservationId, email } = await createReservationService(reservationData);
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

export const updateReservationStatusController = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;
    const success = await updateReservationStatusService(reservationId, status);
    if (success) {
      res.json({ message: `Η κατάσταση της κράτησης ενημερώθηκε σε: ${status}` });
    } else {
      res.status(404).json({ error: "Η κράτηση δεν βρέθηκε." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};