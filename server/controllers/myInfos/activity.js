const { Comments, Like } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  let ary = [];
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const id = accessTokenData.id;
  console.log(333, accessTokenData);

  Comments.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(*)
            FROM Likes
            WHERE
            Likes.targetId = Comments.id)`
          ),
          'likesNum',
        ],
      ],
    },
    where: { userId: id },
  }).then((data) => {
    if (!data) {
      return res.status(401).send('not found Comments');
    }
    data.forEach((result) => {
      const { dataValues } = result;
      ary.push(dataValues);
    });
    const userComments = { ...ary };
    return res.status(200).json({ data: userComments });
  });
};

//EpisodeInfos
//Reply
