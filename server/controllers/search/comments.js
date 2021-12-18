const { Comments } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
  const episodeId = req.query['episode-id'];

  let commentArr = [];
  // 댓글 정보 검색
  try {
    const searchedComments = await Comments.findAll({ where: { episodeId } });

    // 응답 객체 세팅 => 댓글 정보
    for (let i = 0; i < searchedComments.length; i++) {
      let data = searchedComments[i].dataValues;
      const { id, episodeId, userId, content, parentCommentId, createdAt, updatedAt } =
        data;
      // 해당 댓글의 좋아요 수 검색
      const likeNum = await Likes.count({ where: { targetId: id, userId } });

      // 답글일 때
      let replyNums = {};
      if (parentCommentId !== null) {
        // 답글 개수 계산
        if (!replyNums[parentCommentId]) {
          replyNums[parentCommentId] = 1;
        } else {
          replyNums[parentCommentId]++;
        }
      }

      commentArr.push({
        id,
        episodeId,
        userId,
        content: content,
        parentCommentId,
        likeNum,
        replyNum: replyNums[i],
        createdAt,
        updatedAt,
      });
    }
    res.status(200).json({ comments: commentArr });
  } catch (err) {
    res.status(500).send(err);
  }
};
