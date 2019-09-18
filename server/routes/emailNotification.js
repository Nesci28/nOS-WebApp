module.exports = async (offlineRigs) => {
  const monk = require('monk');
  const sgMail = require('../node_modules/@sendgrid/mail');
  require('dotenv').config({ path: '../info.env' });

  const db = monk(`${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);
  const rigsInfo = db.get(`${process.env.DB_COLLECTION}`);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let dbEntries = await rigsInfo.find({})
  db.close()
  let now = new Date().getTime()
  dbEntries.forEach(entry => {
    if (entry["New Time"]) {
      if (entry["New Time"] <= (now - 300000)) {
        offlineRigs[`${entry.Username}-${entry.Hostname}`] = (offlineRigs[`${entry.Username}-${entry.Hostname}`]+1) || 1;
      }
      if (offlineRigs[`${entry.Username}-${entry.Hostname}`] == 6) {
        console.log(`${entry.Hostname} is not running`)
        sendEmail(getAddress(entry.Username), entry.Hostname, entry["New Time"], now)
      }
    }
  })
  function getAddress(email) {
    if (email == 'markgagnon') return "markgagnon28@gmail.com"
    else return email
  }
  
  async function sendEmail(email, hostname, lastSeenTime, now) {
    const msg = {
      to: email,
      from: 'nos-notification@nos.com',
      subject: `${hostname} is down!`,
      text: `
      ${hostname} is down!
      Last time seen: ${lastSeenTime}
      Time right now: ${now}
      `,
    };
    sgMail.send(msg);
    console.log("email sent!")
  }
}