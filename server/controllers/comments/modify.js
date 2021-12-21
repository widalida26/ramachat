const { Comments } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const accessTokenData = isAuthorized(req);
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

  try {
    // 댓글 정보 수정
    const updatedComment = await Comments.update(
      { content: newContent },
      { where: { id: commentId } }
    )[0];
    // 수정할 댓글이 없는 경우
    if (!updatedComment) {
      res.status(404).send('nothing to modify');
      return;
    }
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  // 댓글이 수정되었을 때
  try {
    // 필요한 정보를 찾음
    commentResponse = await Comments.findOne({
      attributes: ['id', 'updatedAt'],
      where: { id: commentId },
    });
    res.status(201).json(commentResponse);
  } catch (err) {
    res.status(500).send(err);
  }
};
