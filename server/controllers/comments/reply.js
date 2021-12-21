const sequelize = require('../../models').sequelize;
const { Comments } = require('../../models');

module.exports = async (req, res) => {
  let parentCommentId = -1;
  try {
    parentCommentId = req.query['parent-comment-id'];
  } catch {
    res.status(400).send('content to modify is not included in request body');
  }

  try {
    // 답글 정보 검색
    const searchedReplies = await Comments.findAll({
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
      where: { parentCommentId },
      order: [['createdAt', 'DESC']],
    });
    let repliyResponse = searchedReplies.map((el) => el.dataValues);
    res.status(200).json({ comments: repliyResponse });
  } catch (err) {
    {
      res.status(500).send();
    }
  }
};
