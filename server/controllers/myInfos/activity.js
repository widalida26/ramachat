const { Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { decrypt, encrypt } = require('../users/crypto');
const { Like } = require('../../models');
const { CommentsFindAll } = require('../dbfunction/index');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const CommentsFind = CommentsFindAll(accessTokenData);
  console.log(111, CommentsFind);

  res.status(200).json({ data: { data: data }, message: 'ok' });
};
