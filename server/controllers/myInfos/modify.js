const { Users } = require('../../models');

module.exports = (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달

  let user_id = req.query['user-id'];

  Users.findOne({
    where: {
      user_id,
    },
  }).then((data) => {
    if (!data) {
      res.status(404).send('not found user');
    } else {
      return res.status(200).send('ok');
    }
  });
};
