const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1]; // Token sent in headers
  console.log(token)
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded.user; // Attach decoded user info to request
    next(); // Move to next middleware/route handler
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
