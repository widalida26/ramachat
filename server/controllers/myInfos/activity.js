const { Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { decrypt, encrypt } = require('../users/crypto');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const { id } = accessTokenData;

  Comments.findAll({
    where: {
      userid: id,
    },
  }).then((data) => {
    if (!data) {
      return res.status(404).send('not found contents');
    }
    res.status(200).json({ data: { data: data }, message: 'ok' });
  });
};
