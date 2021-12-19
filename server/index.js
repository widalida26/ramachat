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
    origin: [`http://localhost:3000`],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  })
);
app.use(cookieParser());

app.post('/login', controllers.login);
app.post('/signup', controllers.signup);
app.post('/logout', controllers.logout);

app.get('/userInfo', controllers.userInfo);
app.get('/auth', controllers.auth);

app.get('/episode-infos', controllers.episodeInfos); // 에피소드 정보 조회
app.get('/comments', controllers.comments); // 댓글 정보 조회
app.post('/comments/add', controllers.add); // 댓글 작성
app.delete('/comments/delete', controllers.delete); // 댓글 삭제
//app.put('/modify', controllers.modify);

const HTTPS_PORT = process.env.HTTPS_PORT || 8000;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () =>
    console.log('https server runnning', `\nport number is ${HTTPS_PORT}`)
  );
} else {
  server = app.listen(HTTPS_PORT, () =>
    console.log('http server runnning', `\nport number is ${HTTPS_PORT}`)
  );
}
module.exports = server;
