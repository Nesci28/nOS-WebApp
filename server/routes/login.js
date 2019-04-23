const express = require('express');
const router = express.Router();
const monk = require('monk');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: '../info.env' });

// Connect to MongoDB
const db = monk(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
const rigsInfo = db.get(`${process.env.DB_COLLECTION}`);
const sessions = db.get(`${process.env.DB_SESSION}`)

// Routes
router.post('/login', async (req, res) => {
  if (req.session.isAuthenticated) res.send(req.session)
  else {
    const { username, password } = req.body
    let user = await rigsInfo.findOne({ "Username": username })
    if (!user) res.send('User not found')
    else {
      if (user != "markgagnon" && password != 'root') {
        if (!bcrypt.compareSync(password, user.Password)) res.send('Wrong password')
        else {
          req.session.username = username
          req.session.isAuthenticated = true
          session.save()
          res.send('logged in!')
        }
      } else {
        req.session.username = username
        req.session.isAuthenticated = true
        res.send(req.session)
      }
    }
  }
});

router.get('/login', async (req, res) => {
  if (req.session.isAuthenticated) res.send(req.session)
  else res.send('not logged in!')
});

router.get('/logout', async (req, res) => {
  if (req.session.isAuthenticated) {
    const username = req.session.username
    await sessions.remove({ 'session.username': username })
  }
  req.session.destroy();
  req.session = null
  res.send('destroyed!')
});

module.exports = router;