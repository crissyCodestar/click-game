let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

router.get('/', db.getAllUsers);

router.post("/new", db.createUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user;
  res.json(req.user);
});

router.get("/logout", loginRequired, db.logoutuser);

// router.get("/clicks", db.getClicks);
// router.post("/clicks", db.postClicks);

router.get("/scores", loginRequired, db.getUserScores);
router.patch("/scores", loginRequired, db.updateUserScores);

module.exports = router;
