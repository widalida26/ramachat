const { Comments } = require('../../models');
const { Notifications } = require('../../models');

module.exports = {
  addNewComment: (comment, episodeId, res) => {
    // 댓글을 Comments 테이블에 삽입
    return Comments.create(comment)
      .then((createdComment) => {
        const { id, userId, content, updatedAt, createdAt } = createdComment.dataValues;
        // 반환할 댓글 정보 객체 세팅
        const commentResponse = {
          id,
          episodeId,
          userId,
          content,
          updatedAt,
          createdAt,
          parentCommentId: comment.parentCommentId,
        };

        // 답글이 아닐 때s
        if (!comment.parentCommentId) {
          res.status(201).json(commentResponse);
          // 답글일 때
          // 알림 테이블에 추가
        } else {
          Notifications.create({
            userId,
            commentId: id,
          })
            .then((createdNotifications) => {
              res.status(201).json(commentResponse);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

// 댓글 숫자 업데이트
// let newCommentNum = commentNum + 1;
// EpisodeInfos.update(
//   {
//     commentNum: newCommentNum,
//   },
//   {
//     where: {
//       id: episodeId,
//     },
//   }
// )
//.then((updatedEpisodeInfo) => {
//  }
// })
// .catch((err) => {
//   res.status(500).send('err');
// });
