const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const monk = require('monk');
const localtunnel = require('localtunnel')

const db = monk('nesci:012Webserver@ds153495.mlab.com:53495/webserver');
const rigsInfo = db.get('rigsInfo');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/db/:user/:pass', (req, res) => {
  const user = req.params.user
  const password = req.params.pass
  rigsInfo
  .find({"Username": user, "Password": password})
  .then(data => {
    res.json(data)   
  }); 
});

app.post('/add', (req, res) => {
  
});

  
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Listening on port', port);
  const tunnel = localtunnel(port, {subdomain: `chosn`},function(err, tunnel) {
    if (err) return
    console.log(tunnel.url)
    tunnel.url;
	});
});
