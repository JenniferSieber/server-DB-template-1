const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function requireAuth(req, res, next) {
  try {
    // Read token off cookies
  const token = req.cookies.Authorization;

  // Decode the token
  const decoded = jwt.verify(token, process.env.SECRET);

  // Check for expired token
  if (Date.now() > decoded.exp) return res.sendStatus(401);
  
  // Find user using decoded sub return if not user
  const user = await User.findById((decoded.sub));
  if (!user) return res.sendStatus(401);

  // attach user to request
  // do it to access it within our controller fn
    req.user = user;

  // continue on
  console.log('In middleware')
  next();
  
  } catch(err) {
    res.sendStatus(401);
  } 
}

module.exports = requireAuth;