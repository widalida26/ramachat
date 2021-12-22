const { Notifications, Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  console.log(111);
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  console.log(accessTokenData);
  const id = accessTokenData.id;

  const sql = `select n.id,n.userId,n.commentId,c.content,c.parentCommentId ,n.isChecked from Notifications as n join Comments as c on n.commentId = c.id where  n.userId= ${id}`;
  sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then((data) => {
    console.log(333, data);
    return res.status(200).json({ data: data });
  });
};
// Comments.findAll({
//   where: { userId: id },
// }).then((data) => {
//   if (!data) {
//     return res.status(401).send('invalid user');
//   }
//   const id = data.id;
//   Notifications.findAll({
//     where: { commentId: id },
//   }).then((result) => {
//     console.log(999, result);
//   });
// });

// const result = data.map((ele) => {
//     const dataResult = {
//       id: ele.id,
//       userId: ele.userId,
//       commentId: ele.commentId,
//       content: ele.content,
//       parentCommentId: ele.parentCommentId,
//     };
//     return dataResult;
//   });
//   console.log(888, result);
// });
