const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const userDAO = require("../daos/user");
const tokenDAO = require("../daos/token");

const { v4: uuidv4 } = require("uuid");

const isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
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
  } catch (e) {
    next(e);
  }
};

// Create
router.post("/signup", async (req, res, next) => {
  // try {
    const user = req.body;
    const { email, password } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
    }

    const userExists = await userDAO.findByEmail(email);
    if (userExists) {
      res.sendStatus(409);
    } else {
      user.password = await bcrypt.hash(password, 1);
      const createdUser = await userDAO.create(user);
      res.sendStatus(createdUser ? 200 : 400);
    }
  // }
  //  catch (e) {
  //   next(e);
  // }
});

router.post("/password", isLoggedIn, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await userDAO.findEmail(email);

    if (user) {
      if (password) {
        user.password = await bcrypt.hash(user.password, 1);
        const updatedPassword = await userDAO.updatePassword(user);
        return res.json(updatedPassword);
      }
    }
  } catch (e) {
    next(e);
  }
});

//Logout

router.post("/logout", isLoggedIn, async (req, res, next) => {
  const { token } = req.body;
  const removedToken = await tokenDAO.deleteToken(req.token);
  try {
    if (removedToken) {
      res.statusSend(200);
    } else {
      res.statusSend(401);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Incomplete Request");
    }

    const foundUser = await userDAO.findByEmail(email);

    if (foundUser) {
      const returnToken = await bcrypt.compare(password, foundUser.password);

      if (returnToken) {
        const token = await tokenDAO.assignToken(req.body._id);
         return res.json(token);
      } else {
        res.sendStatus(401);
      }
    } else { res.sendStatus(401); }
  } catch (e) {
    next(e);
  }
});


module.exports = router;
