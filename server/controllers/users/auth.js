const { Users } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  console.log(req);
  console.log(req.cookies);
  const accessTokenData = isAuthorized(req.headers.authrization);
  //console.log(5555, req.cookies.jwt);

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
