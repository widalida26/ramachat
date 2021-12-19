const { Users } = require('../../models');
const { encrypt, decrypt } = require('./crypto');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  const userId = accessTokenData.userId;

  console.log(111, userId);
  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  Users.destroy({
    where: {
      userId: userId,
    },
  });
  return res.status(200).send('successfully signed out');
};
