const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);
  console.log('get right header?');
  console.log('HEADER', req.headers.authorization);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: 'not authorized' });
  }
  const { userId } = accessTokenData;
  Users.findOne({
    where: {
      userId,
    },
  }).then((data) => {
    if (data) {
      delete data.dataValues.password;
      return res.json({ data: { userInfo: data.dataValues }, message: 'ok' });
    }
  });
};
