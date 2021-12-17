const { Users } = require('../../models');
const { encrypt, decrypt } = require('./crypto');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  const { user_id, email, password } = req.body;

  if (!req.body.email || !req.body.password || !req.body.user_id) {
    return res.status(422).send('insufficient parameters supplied');
  }

  Users.findOne({
    where: {
      user_id,
    },
  })
    .then((data) => {
      if (data) {
        return res.status(409).send('already existed email');
      } else {
        const pw = encrypt(password);

        Users.create({
          user_id: user_id,
          password: pw,
          email: email,
        });

        return status(200).send('ok');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
