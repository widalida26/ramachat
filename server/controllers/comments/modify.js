const { Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req.headers.authorization);
  // 인증 실패
  if (accessTokenData === null) {
    res.status(401).send('unauthorized user');
    return;
  }

  // 인증 성공
  const { commentId } = req.params;
  let newContent = '';
  try {
    newContent = req.body.newContent;
    // request body에 newContent 값이 없는 경우
  } catch {
    res.status(400).send('content to modify is not included in request body');
    return;
  }

  // 댓글 정보 수정
  await Comments.update({ content: newContent }, { where: { id: commentId } })
    .then((result) => {
      // 수정할 댓글이 없는 경우
      if (result[0] === 0) {
        res.status(404).send('nothing to modify');
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  // 댓글이 수정되었을 때
  // 필요한 정보를 찾음
  await Comments.findOne({
    attributes: ['id', 'updatedAt'],
    where: { id: commentId },
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
