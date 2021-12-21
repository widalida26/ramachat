const { Notifications, Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const userId = accessTokenData.userId;

  console.log('hi');
  sequelize
    .query(
      `select * from Notifications as n join Comments as c on n.commentId = c.id join Users as u on u.id = n.userId`
    )
    .then((data) => {
      console.log(data);
    });
};

// SELECT *
// FROM 테이블_1
// JOIN 테이블_2 ON 테이블_1.특성_A = 테이블_2.특성_B
