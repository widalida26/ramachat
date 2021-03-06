const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const { encrypt, decrypt } = require('./crypto');

module.exports = (req, res) => {
  const { userId, password } = req.body;

  console.log(userId, password);

  Users.findOne({
    where: {
      userId,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).send('invalid user');
      }
      const dbpw = data.password;
      const depw = decrypt(dbpw);

      if (depw !== password) {
        return res.status(404).send('password is different');
      }
      // delete data.dataValues.password;
      const accessToken = generateAccessToken(data.dataValues);

      console.log(111, accessToken);

      // sendAccessToken(res, accessToken);

      res
        .status(200)
        .cookie('jwt', accessToken, {
          // domain: DOMAIN,
          // path: '/',
          // secure: true,
          // httpOnly: true,
          // sameSite: 'none',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
        })
        .json({ data: { accessToken: accessToken }, message: 'ok' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
};
