import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: 'Δεν επιτρέπεται η πρόσβαση. Απαιτείται σύνδεση.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};