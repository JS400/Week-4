const { Router } = require("express");
const router = Router();
const Token = require("../models/token");



// Log Requests Server Side.
// router.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} at ${new Date()}`);
//   next();
// });

// isLoggedIn(req, res, next) - should check if the user has a valid token and if so make req.userId = the userId associated with that token. The token will be coming in as a bearer token in the authorization header (i.e. req.headers.authorization = 'Bearer 1234abcd') and you will need to extract just the token text. Any route that says "If the user is logged in" should use this middleware function.

// Error handling - router.use(error, req, res, next) - Can be used to handle errors where the provided note id is not a valid ObjectId. This can be done without middleware though.

router.use("/login", require("./login"));
router.use("/notes", require("./notes"));

const isLoggedIn = async  (req, res, next) => {
  const { authorization } = req.headers;
  const { _id } = req.body;
  const token = authorization.split(' ')[1];
  const foundUserWithToken = await tokenDAO.findTokenByUser( _id );

  if (token == foundUserWithToken.token) {
    return true
  } else {
    return false
  }

}

router.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

module.exports = router;