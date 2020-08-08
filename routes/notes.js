const { Router } = require("express");
const router = Router();
const noteDAO = require("../daos/note");
const tokenDAO = require("../daos/token");

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

router.post("/", isLoggedIn, async (req, res) => {
  const createNote = await noteDAO.create(req.body);
  if (createNote) {
    return oneNote;
  } else {
    res.sendStatus(404);
  }
});

router.get("/", isLoggedIn, async (req, res) => {
  let allNote = await noteDAO.find();
  if (oneNote) {
    return oneNote;
  } else {
    res.sendStatus(404);
  }
});

router.get("/:id", isLoggedIn, async (req, res) => {
  const oneNote = await noteDAO.findById(req.body._id);
  if (oneNote) {
    return oneNote;
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
