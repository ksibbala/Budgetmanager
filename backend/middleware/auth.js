const jwt = require('jsonwebtoken');

// Middleware to authenticate the user by verifying the token
const authMiddleware = (req, res, next) => {
  // Get token from headers
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret

    // Set user from payload
    req.user = decoded.user;  // Attach user object to req for access in route handlers
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;