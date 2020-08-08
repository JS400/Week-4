const { Router } = require("express");
const router = Router();
const Token = require("../models/token");

router.use("/login", require("./login"));
router.use("/notes", require("./notes"));

router.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = router;
