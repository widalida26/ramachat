const { Notifications, Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  const dataResult = [];

  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  console.log();

  const id = accessTokenData.id;

  console.log(id);
  const sql = `select n.id,n.userId,n.commentId,c.content,c.parentCommentId from Notifications as n join Comments as c on n.commentId = c.id where  n.userId= ${id}`;
  console.log('hi');
  sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((data) => {
    data.forEach((ele) => {
      if (ele.parentCommentId !== null) {
        const result = ele;
        console.log(result);
      }
      console.log(555, dataResult);
    });
    return res.status(200).json({ data: data });
  });
};
