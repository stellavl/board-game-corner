import { loginUser } from "../services/login-service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Το email και ο κωδικός πρόσβασης είναι υποχρεωτικά.' });
  }

  try {
    const user = await loginUser(email, password);
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
      },
      // token: '...JWT...' (add this later)
    });
  } catch (error) {
    if (error.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Ο διακομιστής απέτυχε.' });
  }
};