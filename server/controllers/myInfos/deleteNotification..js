const { Users, Notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const notiId = req.params.notiId;

  if (notiId) {
    return res.status(500).send('err');
  }

  Notifications.destroy({
    where: notiId,
  });
  return res.status(201).send('delete notification');
};

//삭제
