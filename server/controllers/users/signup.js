const { Users } = require('../../models');
const { encrypt, decrypt } = require('./crypto');

module.exports = (req, res) => {
  const { userId, email, password } = req.body;

  if (!req.body.email || !req.body.password || !req.body.userId) {
    return res.status(422).send('insufficient parameters supplied');
  }

  Users.findOne({
    where: {
      userId,
    },
  })
    .then((data) => {
      if (data) {
        return res.status(409).send('already existed email');
      } else {
        const pw = encrypt(password);
        const em = encrypt(email);

        console.log(444, pw);

        Users.create({
          userId: userId,
          password: pw,
          email: em,
        });

        return res.status(200).send('ok');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
