import { loginPersonalUser} from "../services/login-personal-service.js";
import { loginAdminUser } from "../services/login-admin-service.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Το email και ο κωδικός πρόσβασης είναι υποχρεωτικά.' });
  }

  let loginFunction;
  if (role === 'USER') {
    loginFunction = loginPersonalUser;
  } else if (role === 'ADMIN') {
    loginFunction = loginAdminUser;
  }

  try {
    const user = await loginFunction(email, password);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({
      message: `${role} login successful`,
      [role]: {
        id: user.user_id,
      },
      token,
    });
  } catch (error) {
    if (error.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Ο διακομιστής απέτυχε.' });
  }
};