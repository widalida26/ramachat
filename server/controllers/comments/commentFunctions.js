const { Comments } = require('../../models');
const { Episode_infos } = require('../../models');
const { Notifications } = require('../../models');

module.exports = {
  addNewComment: (comment, commentNum, episodeId, res) => {
    // 댓글을 Comments 테이블에 삽입
    return Comments.create(comment)
      .then((result) => {
        const { id, userId, content, updatedAt, createdAt } = result.dataValues;
        // 댓글 숫자 업데이트
        let newCommentNum = commentNum + 1;
        Episode_infos.update(
          {
            commentNum: newCommentNum,
          },
          {
            where: {
              id: episodeId,
            },
          }
        )
          .then((result) => {
            // 답글이 아닐 때
            if (!comment.parentCommentId) {
              res.status(201).json({
                id,
                episodeId,
                userId,
                content,
                updatedAt,
                createdAt,
              });
              // 답글일 때
              // 알림 테이블에 추가
            } else {
              Notifications.create({
                userId,
                commentId: id,
              }).then((result) => {
                res
                  .status(201)
                  .json({
                    id,
                    episodeId,
                    userId,
                    content,
                    parentCommentId: comment.parentCommentId,
                    updatedAt,
                    createdAt,
                  })
                  .catch((err) => {
                    res.status(500).send('err');
                  });
              });
            }
          })
          .catch((err) => {
            console.log('comment number update failed');
            console.log(err);
            res.status(500).send('err');
          });
      })
      .catch((err) => {
        console.log('comment information insertion failed');
        console.log(err);
        res.status(500).send('err');
      });
  },
};
