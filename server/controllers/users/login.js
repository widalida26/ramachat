const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달

  const { user_id, password } = req.body;

  Users.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).send('invalid user or wrong password');
      } else {
        // delete data.dataValues.password;
        const accessToken = generateAccessToken(data.dataValues);

        sendAccessToken(res, accessToken);
      }
    })
    .catch((err) => {
<<<<<<< HEAD
      console.log(err);
=======
>>>>>>> 782514e984c9242d66e4731c5666cd0e00c60f66
      return res.status(500).send('err');
    });
};
