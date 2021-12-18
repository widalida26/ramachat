const { Comments } = require('../../models');
const { Episode_infos } = require('../../models');

module.exports = {
  addNewComment: (comment, commentNum, episodeId) => {
    // 댓글을 Comments 테이블에 삽입
    return Comments.create(comment)
      .then((result) => {
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
            console.log(result);
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
