// Import dependencies
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

async function signup(req, res) {
  try {
    // Get the email and password off req body
    const { email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the data
    await User.create({ email, password: hashedPassword });

    // respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    console.log('login')
    // Get the email and password off rq body
    const { email, password } = req.body;

    // Find the user with requested email
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(401);

    // Compare sent in password with found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log(password, user, passwordMatch)
    if (!passwordMatch) return res.sendStatus(401);

    // create a jwt token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    // For Testing: const exp = Date.now() + 1000 * 10;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    // send it
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
function logout(req, res) {
  console.log('logout') 
  // Delete cookie created 
  res.clearCookie("Authorization");

  // Log out user 
  res.sendStatus(200)
};

function checkAuth(req, res) {
  try {
    console.log(req.user)
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400);
  }
}


module.exports = {
  signup,
  login,
  logout,
  checkAuth
}