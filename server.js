require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.post('/transcript', async (req, res) => {
  const { messages } = req.body;
  let html = '<h1>Your Chat Transcript</h1>';
  for (const msg of messages) {
    html += `<p><strong>${msg.user.name}</strong>: ${msg.text}</p>`;
  }

  nodemailerMailgun.sendMail(
    {
      from: 'chat@example.com',
      to: 'ayisaiah@gmail.com',
      subject: 'Chat transcript',
      html,
    },
    (err) => {
      if (err) {
        console.log(`Error: ${err}`);
        res.status(500);
      } else {
        res.status(200);
      }
    },
  );
});

app.listen(7000, () => {
  console.log(`Server running on PORT 7000`);
});
