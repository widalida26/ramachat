require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['https://localhost:3000'],
    credentials: true,
<<<<<<< HEAD
    methods: ['GET', 'POST', 'OPTIONS'],
=======
    methods: ['GET', 'POST', 'OPTIONS']
>>>>>>> 79a98285301770c29d2cbd250ecc624dbc1b6550
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server runnning'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
}
<<<<<<< HEAD
module.exports = server;
=======
module.exports = server;
>>>>>>> 79a98285301770c29d2cbd250ecc624dbc1b6550
