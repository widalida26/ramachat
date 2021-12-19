const sequelize = require('../../models').sequelize;
const Op = require('sequelize').Op;
const { Comments } = require('../../models');

module.exports = async (req, res) => {
  try {
    let episodeId = req.query['episode-id'];
    // 댓글 정보 검색
    const searchedComments = await Comments.findAll({
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
      where: { episodeId, parentCommentId: null },
      order: [['createdAt', 'DESC']],
    });

    // 답글 개수 조회
    const replyNums = await Comments.findAll({
      attributes: [
        'parentCommentId',
        [sequelize.fn('COUNT', 'parentCommentId'), 'replyNum'],
      ],
      where: { parentCommentId: { [Op.ne]: null } },
      group: ['parentCommentId'],
    }).then((result) => {
      let cnt = {};
      result.forEach((data) => {
        const { parentCommentId, replyNum } = data.dataValues;
        cnt[parentCommentId] = replyNum;
      });
      return cnt;
    });

    // 응답 객체 세팅 => 댓글 정보
    let commentArr = searchedComments.map((comment) => {
      let commentResponse = ({
        id,
        episodeId,
        userId,
        content,
        parentCommentId,
        likeNum,
        createdAt,
        updatedAt,
      } = comment.dataValues);
      commentResponse.replyNum = replyNums[id] === undefined ? 0 : replyNums[id];
      return commentResponse;
    });

    res.status(200).json({ comments: commentArr });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
