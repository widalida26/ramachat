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
<<<<<<< HEAD
        .status(200)
        .json({ data: { data: accessToken }, message: 'ok' });
=======
        .json({ data: { accessToken: accessToken }, message: 'ok' });
>>>>>>> 013b24a36e487bdc4f38dd63d8e0f13cb78a6b04
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
};
