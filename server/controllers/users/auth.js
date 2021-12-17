const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }
  const { user_id } = accessTokenData;
  Users.findOne({
    where: {
      user_id,
    },
  }).then((data) => {
    if (data) {
      delete data.dataValues.password;
      return res.json({ data: { userInfo: data.dataValues }, message: 'ok' });
    }
  });
};
