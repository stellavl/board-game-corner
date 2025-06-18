import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  
  if (!token) {
    res.status(401).json({ error: 'Δεν επιτρέπεται η πρόσβαση. Απαιτείται σύνδεση.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ error: 'Η σύνδεση έληξε. Συνδεθείτε ξανά.' });
  }
};