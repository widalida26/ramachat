const { Comments } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
  try {
    const episodeId = req.query['episode-id'];

    let commentArr = [];
    let replyNums = {};

    // 댓글 정보 검색
    const searchedComments = await Comments.findAll({
      where: { episodeId, parentCommentId: null },
      order: [['createdAt', 'DESC']],
    });
    console.log(searchedComments);

    // 응답 객체 세팅 => 댓글 정보
    for (let i = 0; i < searchedComments.length; i++) {
      let data = searchedComments[i].dataValues;
      const { id, episodeId, userId, content, parentCommentId, createdAt, updatedAt } =
        data;
      // 해당 댓글의 좋아요 수 검색
      const likeNum = await Likes.count({ where: { targetId: id, userId } });

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
