const { isAuthorized } = require('../tokenFunctions');
const sequelize = require('../../models').sequelize;
const { Comments, Likes } = require('../../models');
module.exports = async (req, res) => {
  let obj = [];
  const accessTokenData = isAuthorized(req.headers.authorization);

  if (accessTokenData === null) {
    res.status(401).send({ data: null, message: 'not authorized' });
  }

  const id = accessTokenData.id;
  console.log(222, id);
  console.log(333, accessTokenData);

  const likeNum = await Comments.findAll({
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(*)
                    FROM Likes
                    WHERE
                    Comments.id = Likes.targetId && 
                    Comments.userId=Likes.userId)`
          ),
          'likeNum',
        ],
      ],
    },
    attributes: {
      include: [
        [
          sequelize.literal(
            `(SELECT COUNT(*)
                    FROM Likes
                    WHERE
                    Comments.id = Comments.parentCommentId `
          ),
          'replyNum',
        ],
      ],
    },
    where: { userId: id },
  }).then((result) => result);

  console.log(444, likeNum);
};

// const replyNum = await Comments.findAll({
//   attributes: ['parentCommentId'],
//   include: [
//     [
//       sequelize.literal(
//         `(SELECT COUNT(*)
//                   FROM Likes
//                   WHERE
//                   Comments.id = Comments.parentCommentId)`
//       ),
//       'likeNum',
//     ],
//   ],
//   where: { userId: id },
// });

// console.log(333, replyNum);

//EpisodeInfos
//Reply

// const sql = `select u.id,c.episodeId,c.content,c.parentCommentId,e.dramaId,e.dramaName,e.seasonIndex,e.episodeIndex from Users as u join Comments as c on u.id = c.userId join EpisodeInfos as e on c.episodeId = e.id where u.id = ${id}`;

// const result = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

//   const likeNum = await result
//     .findAll({
//       attributes: {
//         include: [
//           [
//             sequelize.literal(
//               `(SELECT COUNT(*)
//                 FROM Likes
//                 WHERE
//                 Likes.targetId = Comments.id)`
//             ),
//             'likesNum',
//           ],
//         ],
//       },
//     })
//     .then((data) => {
//       console.log(555, data);
//     });
// };
