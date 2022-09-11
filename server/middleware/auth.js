const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Checks if the user has a token, and if it is valid
// Returns unauthorized otherwise
const isAuthorized = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      msg: 'Unauthorized'
    })
  }

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.error(err)
    return res.status(401).json({
      msg: err.message
    })
  }
  next()
};

module.exports = isAuthorized;