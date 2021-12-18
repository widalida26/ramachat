const db = require('../../models');
const { Comments } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
  try {
    const episodeId = req.query['episode-id'];

    let commentArr = [];
    let replyNums = {};

    // 댓글 정보 검색
    const searchedComments = await Comments.findAll({
      attributes: {
        include: [
          [
            db.sequelize.literal(
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

    // 응답 객체 세팅 => 댓글 정보
    for (let i = 0; i < searchedComments.length; i++) {
      let data = searchedComments[i].dataValues;
      const {
        id,
        episodeId,
        userId,
        content,
        parentCommentId,
        likeNum,
        createdAt,
        updatedAt,
      } = data;

      //   // 답글일 때
      //   if (parentCommentId !== null) {
      //     // 답글 개수 계산
      //     if (!commentArr[parentCommentId]) {
      //       commentArr[parentCommentId] = {};
      //       commentArr[parentCommentId]['replyNum'] = 0;
      //     } else {
      //       commentArr[parentCommentId]['replyNum']++;
      //     }
      //     continue;
      //   }

      //let replyNum = commentArr[id] === undefined ? 0 : commentArr[id]['replyNum'];
      commentArr[i] = {
        id,
        episodeId,
        userId,
        content: content,
        parentCommentId,
        likeNum,
        //replyNum,
        createdAt,
        updatedAt,
      };
    }

    // for (const key in replyNums) {
    //   commentArr[key - 1].replyNum = replyNums[key];
    // }

    res.status(200).json({ comments: commentArr });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
