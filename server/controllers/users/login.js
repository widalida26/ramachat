const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');
const { encrypt, decrypt } = require('./crypto');

module.exports = (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달

  const { user_id, password } = req.body;

  Users.findOne({
    where: {
      user_id,
    },
  })
    .then((data) => {
      const dbpw = data.password;
      const depw = decrypt(dbpw);

      if (!data) {
        return res.status(401).send('invalid user or wrong password');
      }
      if (depw !== password) {
        return res.status(404).send('password is different');
      }
      // delete data.dataValues.password;
      const accessToken = generateAccessToken(data.dataValues);

      sendAccessToken(res, accessToken);
    })
    .catch((err) => {
      return res.status(500).send('err');
    });
};
