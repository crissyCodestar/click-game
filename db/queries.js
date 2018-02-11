const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function getAllUsers(req, res, next) {
  db
    .any("select * from users")
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL users"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateUserScores(req, res, next) {
  db
    .none(
      "update users set scores = ${scores} where username = ${username}",
      {
        scores: req.body.scores,
        username: req.user.username
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        message: "Changed user scores"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

/*
  req.user = {
    username: "..."
  }

*/
function getUserScores(req, res, next) {
  console.log("get scores");
  db
    .one("select scores from users where username = ${username}", req.user)
    .then(function(data) {
      console.log("got scores: ", data);
      res.status(200).json({
        status: "success",
        scores: data.scores,
        message: "Fetched user scores"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  db
    .any("select * from users where username = ${username}", req.user)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched one user"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateSingleUser(req, res, next) {
  db
    .none(
      "update users set username = ${newName} where username = ${username}",
      req.body
    )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        message: "Changed one user"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function loginUser(req, res, next) {
  passport.authenticate("local", {});
  const authenticate = passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).send("error while trying to log in");
    } else if (!user) {
      res.status(401).send("invalid username/password");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.status(200).send(user);
        }
      });
    }
  });

  return authenticate(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function createUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.password);
  console.log("createuser hash: ", hash);
  db
    .none(
      "INSERT INTO users (username, password_digest) VALUES (${username}, ${password})",
      { username: req.body.username, password: hash }
    )
    .then(() => {
      res.send(`created user: ${req.body.username}`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("error creating user");
    });
}


// function getClicks(req, res){
//   db.prepare("select scores from users where id = ${id}", req.id)
// }



module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateSingleUser: updateSingleUser,
  loginUser: loginUser,
  logoutuser: logoutUser,
  getUserScores: getUserScores,
  updateUserScores: updateUserScores
};
