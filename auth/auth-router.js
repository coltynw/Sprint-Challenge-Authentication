const db = require("../database/dbConfig")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/user-model")

const router = require('express').Router();

router.post('/register', (req, res) => {
  // implement registration
  try {
    let hash = bcrypt.hashSync(req.body.password, 12)
    req.body.password = hash

    const addedUser = db("users").insert(req.body)
    res.json(addedUser)
  }

  catch(err) {
    res.status(500).json(err)
  }
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.getUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.json({
          message: `Hello ${user.username}!`,
          token
        });
      } else {
        res.status(404).json({ message: 'error' });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: `error2`
      });
    });
});

function signToken(user) {
  const options = {
    expiresIn: '1d'
  }

  const payload = {
    subject: user.id,
    username: user.username
  }

  return jwt.sign(payload, 'w0efj0wjfi0j', options)
}

module.exports = router;
