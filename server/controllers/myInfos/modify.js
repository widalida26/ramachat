const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { decrypt, encrypt } = require('../users/crypto');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const { userId, email } = accessTokenData;
  const { password } = req.body;

  const dbpw = encrypt(password);

  Users.findOne({
    where: {
      userId,
    },
  }).then((data) => {
    if (data.password === dbpw) {
      return res.status(404).send('same as previous password');
    } else {
      Users.update(
        {
          password: dbpw,
        },
        {
          where: {
            userId,
            email: email,
          },
        }
      );
      return res.status(201).send('password changed');
    }
  });
};
