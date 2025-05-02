const checkBarrierToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  
    console.log('Token:', token); 
  
    if (!token) {
      return res.status(403).json({ message: 'Authorization token missing' });
    }
  
  
    const validToken = process.env.BARRIER_TOKEN;
  
    if (token !== validToken) {
      return res.status(403).json({ message: 'Invalid barrier token' });
    }
  
  
    next();
  };
  
  module.exports = checkBarrierToken;
  