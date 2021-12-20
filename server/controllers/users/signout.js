const { Users } = require('../../models');
const { encrypt, decrypt } = require('./crypto');
const { isAuthorized } = require('../tokenFunctions');
const {
  CommentsDelete,
  UsersDelete,
  EpisodeInfosDelete,
} = require('../dbfunction/index');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  console.log(111, accessTokenData);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  CommentsDelete(accessTokenData);
  EpisodeInfosDelete(accessTokenData);
  UsersDelete(accessTokenData);

  return res.status(200).send('successfully signed out');
};
