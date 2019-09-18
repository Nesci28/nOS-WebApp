const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === "development") {
  require('dotenv').config({ path: './info.env' });
}

// Logger
app.use(morgan('tiny'))

// Session store
const store = new MongoDBStore({
  uri: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

// Proxy
app.enable("trust proxy", 1);

// Cors
app.use(
  cors({
    origin: [
      "https://node-nos.herokuapp.com",
      "https://node-os.now.sh",
      "http://localhost:8080",
      "http://192.168.0.127:8080"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
let sess = {
  secret: `${process.env.COOKIE_SECRET}`,
  store: store,
  cookie: {
    expires: Date.now() + 3600000 * 24 * 30,
    maxAge: 1 * 60 * 60 * 24 * 30 * 1000,
    httpOnly: false,
    secure: true
  },
  resave: false,
  unset: "destroy",
  saveUninitialized: false
};

if (app.get("env") == "development") {
  sess.cookie.secure = false;
}
app.use(session(sess));

// Routes
app.use("/api/v2/db", require("./routes/index.js"));
app.use("/api/v2/rig", require("./routes/rig.js"));
app.use("/api/v2/action", require("./routes/login.js"));

// Cronjob
const offlineRigs = {};
cron.schedule("* */1 * * *", async () => {
  await require("./routes/emailNotification.js")(offlineRigs);
  console.log("cronjob done!");
});

// Handle Production
if (process.env.NODE_ENV === "production") {
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
