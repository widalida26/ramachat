const { Comments } = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const { commentId } = req.params;
    const accessTokenData = isAuthorized(req.cookies);

    // 인증 실패
    if (accessTokenData === null) {
      res.status(401).send('unauthorized user');
      return;
    }
    // 인증 성공
    // 삭제할 댓글의 에피소드 아이디 조회
    const commentToDelete = await Comments.findOne({ where: { id: commentId } });

    // 삭제할 댓글이 없는 경우
    if (commentToDelete === null) {
      res.status(204).send('nothing to delete');
      return;
    }

    const { userId, episodeId } = commentToDelete.dataValues;
    // 댓글 삭제
    await Comments.destroy({ where: { id: commentId } });

    // 에피소드에 해당하는 댓글이 없으면 해당 에피소드 정보 삭제
    const restCnt = await Comments.count({ where: { episodeId } });
    if (restCnt === 0) {
      await EpisodeInfos.destroy({ where: { id: episodeId } });
    }

    // 해당 댓글의 알림 정보 삭제
    await Notifications.destroy({ where: { userId, commentId } });

    res.status(200).send('comment delete success');
  } catch (err) {
    res.status(500).send(err);
  }
};
