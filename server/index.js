const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const monk = require('monk');
require('dotenv').config();

const db = monk(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
const rigsInfo = db.get(`${process.env.DB_COLLECTION}`);

const app = express();

app.use(morgan('tiny'));
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/db', (req, res) => {
  const user = req.body.username
  const password = req.body.password
  const hostname = req.body.hostname
  if (hostname == undefined) {
    rigsInfo
      .find({"Username": user, "Password": password})
      .then(data => {
        res.json(data)   
    }); 
  } else {
    rigsInfo
      .find({"Username": user, "Password": password, "Hostname": hostname})
      .then (data => {
        res.send(data)
    })
  }
});

const objectWithoutKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
}

app.post('/add', async (req, res) => {
  if (req.body.info) {
    var user = req.body.info.Username
    var password = req.body.info.Password
    var hostname = req.body.info.Hostname
    var section = req.body.section
  } else {
    var user = req.body.Username
    var password = req.body.Password
    var hostname = req.body.Hostname
  }
  let dbEntry = await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname})
  if (dbEntry.length > 0) {
    let entryID = dbEntry[0]._id
    if (section) {
      dbEntry = objectWithoutKey(dbEntry[0], '_id')
      let updatedEntry = dbEntry
      updatedEntry[section] = req.body.json
    } else {
      updatedEntry = req.body
      updatedEntry._id = entryID
    }
    await rigsInfo.update(entryID, updatedEntry)
    res.send('Updated DB!')
    // res.send(await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname}))
  } else {
    await rigsInfo.insert(req.body)
    res.send('Inserted a new rig in the DB!')
  }
});

app.post('/command', async (req, res) => {
  const user = req.body.username
  const password = req.body.password
  const hostname = req.body.hostname
  const command = req.body.command

  let dbEntry = await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname})
  let entryID = dbEntry[0]._id
  dbEntry = objectWithoutKey(dbEntry[0], '_id')
  let updatedEntry = dbEntry
  updatedEntry["External Command"] = command
  await rigsInfo.update(entryID, updatedEntry)
  res.send(await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname}))
});

app.post('/delete', async (req, res) => {
  const user = req.body.username
  const password = req.body.password
  const hostname = req.body.hostname

  rigsInfo.remove({"Username": user, "Password": password, "Hostname": hostname})
  res.send("Rig deleted!")
});


function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error)
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
      message: error.message
  });
}
  
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening on port', port);
});
