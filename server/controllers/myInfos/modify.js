const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { decrypt, encrypt } = require('../users/crypto');

module.exports = async (req, res) => {
  console.log(111, req.cookies);
  const accessTokenData = isAuthorized(req.cookies);

  console.log(222, accessTokenData);
  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const { userId, email } = accessTokenData;
  const { password } = req.body;

  console.log(444, password);
  const dbpw = encrypt(password);
  console.log(666, dbpw);

  Users.findOne({
    where: {
      userId,
    },
  }).then((data) => {
    console.log(777, data.password);
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
