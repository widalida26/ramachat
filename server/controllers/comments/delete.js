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
      // 인증 성공
    } else {
      // 삭제할 댓글의 에피소드 아이디 조회
      let episodeId = -1;
      const commentToDelete = await Comments.findOne({ where: { id: commentId } });

      // 삭제할 댓글이 없는 경우
      if (commentToDelete === null) {
        res.status(204).send('nothing to delete');
      } else {
        episodeId = commentToDelete.dataValues.episodeId;
        // 댓글 삭제
        await Comments.destroy({ where: { id: commentId } });

        // 에피소드에 해당하는 댓글이 없으면 해당 에피소드 정보 삭제
        const restCnt = await Comments.count({ where: { episodeId } });
        if (restCnt === 0) {
          await EpisodeInfos.destroy({ where: { id: episodeId } });
        }
        //
        res.status(200).send('comment delete success');
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
