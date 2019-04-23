const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config({ path: './info.env' });

const app = express();

// Session store
const store = new MongoDBStore({
  uri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

// Cors
app.use(cors({
  origin: ["https://node-os.now.sh", "http://localhost:8080"],
  methods: ['GET','POST'],
  credentials: true
}))

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express session
app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    store: store,
    cookie: { 
      maxAge: 600000,
      httpOnly: true 
    },
    resave: true,
    unset: 'destroy',
    saveUninitialized: false
  })
);

// Routes
app.use('/db', require('./routes/index.js'));
app.use('/rig', require('./routes/rig.js'));
app.use('/action', require('./routes/login.js'));

// Cronjob
cron.schedule('* */1 * * * ', async () => {
  await require('./routes/emailNotification.js')()
  console.log('cronjob done!')
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));