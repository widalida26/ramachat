const { Users } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달

  console.log(444, Users);
  console.log(666, req.body);
  const { user_id, password } = req.body;

  console.log(555, user_id, password);
  Users.findOne({
    where: {
      user_id,
      password,
    },
  })
    .then((data) => {
      console.log(999, data);
      if (!data) {
        return res.status(404).send('invalid user');
      } else {
        delete data.dataValues.password;
        const accessToken = generateAccessToken(data.dataValues);

        sendAccessToken(res, accessToken);
      }
    })
    .catch((err) => {
      return res.status(500).send('err');
      console.log(err);
    });
};
