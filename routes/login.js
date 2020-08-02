const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const userDAO = require("../daos/user");

// POST /signup - should use bcrypt on the incoming password. Store user with their email and encrypted password, handle conflicts when the email is already in use.
router.post("/signup", async (req, res, next) => {
  const { user, password } = req.body

  if (!password) { res.status(400) }
  
  try {
    req.body.password = await bcrypt.hash(req.body.password, 1);
    const user = await userDAO.create(req.body);

    return res.json(user._id);
  } catch (e) {
    next(e);
  }
});

// POST / - find the user with the provided email. Use bcrypt to compare stored password with the incoming password. If they match, generate a random token with uuid and return it to the user.
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const storedUser = await userDAO.getByEmail(email);
    const passwordsMatch = await bcrypt.compare(password, storedUser.password);

    if (passwordsMatch) {
      const token = await userDAO.assignToken(storedUser._id);
      return res.json(token);
    } else {
      return res.json("Invalid Login");
    }
  } catch (e) {
    next(e);
  }
});

// POST /password - If the user is logged in, store the incoming password using their userId
router.post("/password", async (req, res, next) => {
  const { bearer } = req.headers.authorization
  const { user } = req.body

  try {

    if (bearer) {
      const token = await userDAO.updatePassword(user);
    } else {

    }
  } catch (e) {
    next(e);
  }
});

// POST /logout - If the user is logged in, invalidate their token so they can't use it again (remove it)
router.post("/logout", async (req, res, next) => {
  const { bearer } = req.headers.authorization

  try {
    
   
  } catch (e) {
    next(e);
  }
});
module.exports = router;
