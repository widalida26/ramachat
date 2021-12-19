const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  console.log(333, req.cookies);
  const accessTokenData = isAuthorized(req.cookies);

  console.log(111, accessTokenData);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
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