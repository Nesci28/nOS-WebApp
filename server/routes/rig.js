const express = require('express');
const router = express.Router();
const monk = require('monk');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../info.env' });

// Connect to MongoDB
const db = monk(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
const rigsInfo = db.get(`${process.env.DB_COLLECTION}`);


function passwordConvert(password) {
  let salt = bcrypt.genSaltSync(10);
  return hash = bcrypt.hashSync(password, salt);
}

const objectWithoutKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
}


// Add or Update the RIG entry
router.post('/add', async (req, res) => {
  if (req.body.info) {
    var username = req.body.info.Username
    var password = req.body.info.Password
    var hostname = req.body.info.Hostname
    var section = req.body.section
  } else {
    var username = req.body.Username
    var password = req.body.Password
    var hostname = req.body.Hostname
  }
  let dbEntry = await rigsInfo.find({"Username": username, "Hostname": hostname})
  if (dbEntry.length > 0) {
    if (bcrypt.compareSync(password, dbEntry[0].Password)) {
      let entryID = dbEntry[0]._id
      if (section) {
        dbEntry = objectWithoutKey(dbEntry[0], '_id')
        var updatedEntry = dbEntry
        updatedEntry[section] = req.body.json
      } else {
        var updatedEntry = req.body
        updatedEntry._id = entryID
      }
      updatedEntry.Password = await passwordConvert(password)
      await rigsInfo.update(entryID, updatedEntry)
      db.close()
      res.send('Updated DB!')
      // res.send(await rigsInfo.find({"Username": username, "Password": password, "Hostname": hostname}))
    }
  } else {
    req.body.Password = await passwordConvert(password)
    await rigsInfo.insert(req.body)
    db.close()
    res.send('Inserted a new rig in the DB!')
  }
});


// Send a command to the RIG
router.post('/command', async (req, res) => {
  let { username, password, hostname, command } = req.body
  password = await passwordConvert(password)

  let dbEntry = await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname})
  let entryID = dbEntry[0]._id
  dbEntry = objectWithoutKey(dbEntry[0], '_id')
  let updatedEntry = dbEntry
  updatedEntry["External Command"] = command
  await rigsInfo.update(entryID, updatedEntry)
  db.close()
  res.send('Sent the command to the rig!')
});


// Delete the RIG entry from the DB
router.post('/delete', async (req, res) => {
  let { username, password, hostname } = req.body
  password = await passwordConvert(password)

  await rigsInfo.remove({"Username": user, "Password": password, "Hostname": hostname})
  db.close()
  res.send("Rig deleted!")
});

module.exports = router;