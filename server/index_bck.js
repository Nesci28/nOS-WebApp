const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const bodyparser=require('body-parser')
const cp = require('child_process')
const os = require('os')
const localtunnel = require('localtunnel')
const getJson = require('/home/chosn/CHOSN/getJson')
const monk = require('monk');

const db = monk('lms:012qgry-admin@ds151853.mlab.com:51853/lms');

const app = express()

const hostname = os.hostname().toLowerCase()

app.get('/', async (req, res) => {
  let json = await getJson();
	res.send(json);
})

const port = 5000
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
	const tunnel = localtunnel(port, {subdomain: `chosn-${hostname}`},function(err, tunnel) {
    if (err) return
    console.log(tunnel.url)
    tunnel.url;
	});
})

app.use(express.static('website'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


