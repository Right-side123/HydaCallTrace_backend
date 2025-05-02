const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  console.log('Token:', token);  // Log token for debugging

  if (!token) {
    return res.status(403).json({ message: 'Authorization token missing' });
  }

  const secretKey = process.env.JWT_SECRET;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;  
    next();  
  });
};

module.exports = checkToken;
