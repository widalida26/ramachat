const { Comments } = require('../../models');
const { Likes } = require('../../models');

module.exports = async (req, res) => {
  try {
    const episodeId = req.query['episode-id'];

    let commentArr = [];
    let replyNums = {};

    // 댓글 정보 검색
    const searchedComments = await Comments.findAll({ where: { episodeId } });

    // 응답 객체 세팅 => 댓글 정보
    for (let i = 0; i < searchedComments.length; i++) {
      let data = searchedComments[i].dataValues;
      const { id, episodeId, userId, content, parentCommentId, createdAt, updatedAt } =
        data;
      // 해당 댓글의 좋아요 수 검색
      const likeNum = await Likes.count({ where: { targetId: id, userId } });

      // 답글일 때
      if (parentCommentId !== null) {
        // 답글 개수 계산
        if (!replyNums[parentCommentId]) {
          replyNums[parentCommentId] = 1;
        } else {
          replyNums[parentCommentId]++;
        }
        continue;
      }

      commentArr.push({
        id,
        episodeId,
        userId,
        content: content,
        parentCommentId,
        likeNum,
        replyNum: 0,
        createdAt,
        updatedAt,
      });
    }
    //console.log(commentArr);
    for (const key in replyNums) {
      commentArr[key - 1].replyNum = replyNums[key];
    }

    res.status(200).json({ comments: commentArr });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
