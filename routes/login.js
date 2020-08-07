const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const userDAO = require("../daos/user");
const tokenDAO = require("../daos/token");

const { v4: uuidv4 } = require("uuid");

// Create
router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json('Incomplete Request');
    }

    let userExists = userDAO.findEmail(email);

    if (!userExists._id) {
      user.password = await bcrypt.hash(user.password, 1);
      const createdUser = await userDAO.create(user);
      return res.json(createdUser);
    } else {
      return createdUser;
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json('Incomplete Request');
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
        res.status(401).json('Unauthorized');
      }
    } else {
      res.status(401).json('Unauthorized');
    }
  } catch (e) {
    res.json(e);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { email } = req.body

//     const foundUser = await userDAO.findEmail(email);

//     return foundUser

//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
