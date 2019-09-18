const express = require('express');
const router = express.Router();
const monk = require('monk');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './info.env' });

// Connect to MongoDB
const db = monk(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
const rigsInfo = db.get(`${process.env.DB_COLLECTION}`);

router.get('/', async (req, res) => {
  if (!req.query) {
    let downloadEntry = await rigsInfo.find({ "_id":"5ca115add362a12eb3e5cead"})
    res.send(downloadEntry)
  } else {
    let { username, password, hostname } = req.query
    username = username.toLowerCase()
    if (hostname) {
      var dbRes = await rigsInfo.findOne({"Username": username, "Hostname": hostname})
      db.close()
      if (dbRes) {
        if (bcrypt.compareSync(password, dbRes.Password)) {
          res.send(dbRes)
        } else {
          res.send('Wrong password!')
        }
      } else {
        res.send('New rig detected!')
      }
    }
  }
})

router.post('/', async (req, res) => {
  if (req.session.isAuthenticated && req.session.fakeAccount != true) {
    let username = req.session.username.toLowerCase()
    let hostname = req.body.hostname
    if (hostname) {
      var dbRes = await rigsInfo.find({"Username": username, "Hostname": hostname})
    } else {
      var dbRes = await rigsInfo.find({"Username": username})
    }
    db.close()
    res.send(dbRes)
  } else if (req.session.isAuthenticated && req.session.fakeAccount == true) {
    let dbRes = await rigsInfo.find({"Username": process.env.FAKE_ACCOUNT})
    db.close()
    res.send(dbRes)
  } else {
    let { username, password, hostname } = req.body
    username = username.toLowerCase()
    if (hostname) {
      var dbRes = await rigsInfo.findOne({"Username": username, "Hostname": hostname})
      db.close()
      if (dbRes) {
        if (bcrypt.compareSync(password, dbRes.Password)) {
          res.send(dbRes)
        } else {
          res.send('Wrong password!')
        }
      } else {
        res.send('New rig detected!')
      }
    } else {
      var dbRes = await rigsInfo.find({"Username": username})
      db.close()
      if (dbRes.length > 0) {
        const resArr = []
        for (let i = 0; i < dbRes.length; i++) {
          if (bcrypt.compareSync(password, dbRes[i].Password)) {
            resArr.push(dbRes[i])
          }
        }
        if (resArr.length > 0) res.send(resArr)
        else res.send('Wrong password!')
      }
    }
  }
});

router.post('/updateSession', async (req, res) => {
  if (req.session.isAuthenticated) {
    req.session.rigsState = req.body
  }
  res.send(req.session)
});

module.exports = router;

