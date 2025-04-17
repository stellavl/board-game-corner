import { loginUser } from "../services/login-service.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await loginUser(email, password);
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
      // token: '...JWT...' (add this later)
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
};