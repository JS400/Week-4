const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const userDAO = require("../daos/user");
const tokenDAO = require("../daos/token");

const { v4: uuidv4 } = require("uuid");

const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    if (token) {
      req.token = token;
      const userId = await tokenDAO.findTokenByUser(token);
      if (userId) {
        req.userId = userId;
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Incomplete Request");
    }

    const foundUser = await userDAO.findEmail(email);

    if (foundUser._id) {
      const returnToken = await bcrypt.compare(password, foundUser.password);

      if (returnToken) {
        const foundUserWithToken = await tokenDAO.findTokenByUser(
          foundUser._id
        );
        if (foundUserWithToken.token) {
          return res.json(foundUserWithToken.token);
        } else {
          token = await tokenDAO.create({
            userId: foundUser._id,
            token: uuidv4(),
          });
          return res.json(token.token);
        }
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
});

// Create
router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
    }

    let userExists = await userDAO.findEmail(email);

    if (userExists) {
      res.sendStatus(409);
    } else {
      user.password = await bcrypt.hash(user.password, 1);
      res.sendStatus(200).json(user.password);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/password", isLoggedIn, async (req, res, next) => {
  const { email, password } = req.body;

  let user = await userDAO.findEmail(email);

  if (user) {
    if (password) {
      user.password = await bcrypt.hash(user.password, 1);
      const updatedPassword = await userDAO.updatePassword(user);
      return res.json(updatedPassword);
    }
  }
});

//Logout

router.post("/logout", isLoggedIn, async (req, res, next) => {
  const { token } = req.body;
  const removedToken = await tokenDAO.deleteToken(req.token);

  if (removedToken) {
    res.statusSend(200);
  } else {
    res.statusSend(401);
  }
});

module.exports = router;
