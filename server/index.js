const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const monk = require('monk');

const db = monk('nesci:012Webserver@ds153495.mlab.com:53495/webserver');
const rigsInfo = db.get('rigsInfo');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/db/:user/:pass', (req, res) => {
  const user = req.params.user
  const password = req.params.pass
  rigsInfo
  .find({"Username": user, "Password": password})
  .then(data => {
    res.json(data)   
  }); 
});

const objectWithoutKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
}

app.post('/add', async (req, res) => {
  const user = req.body.info.Username
  const password = req.body.info.Password
  const hostname = req.body.info.Hostname
  const section = req.body.section

  let dbEntry = await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname})
  let entryID = dbEntry[0]._id
  dbEntry = objectWithoutKey(dbEntry[0], '_id')
  let updatedEntry = dbEntry
  updatedEntry[section] = req.body.json
  await rigsInfo.update(entryID, updatedEntry)
  res.send(await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname}))
});

app.post('/command', async (req, res) => {
  const user = req.body.username
  const password = req.body.password
  const hostname = req.body.hostname
  const command = req.body.command

  let dbEntry = await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname})
  console.log(dbEntry)
  let entryID = dbEntry[0]._id
  dbEntry = objectWithoutKey(dbEntry[0], '_id')
  let updatedEntry = dbEntry
  updatedEntry["External Command"] = command
  await rigsInfo.update(entryID, updatedEntry)
  res.send(await rigsInfo.find({"Username": user, "Password": password, "Hostname": hostname}))
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
