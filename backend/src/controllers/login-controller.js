import { loginUser } from "../services/login-service.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' }); 

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Το email και ο κωδικός πρόσβασης είναι υποχρεωτικά.' });
  }

  try {
    const user = await loginUser(email, password);    
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
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