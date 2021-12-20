const { Comments } = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // 작성된 댓글의 아이디
  let createdCommentId = -1;
  // EpisodeInfos 테이블에 정보가 삽입되었는지 여부
  let episodeInfoCreated = false;

  try {
    const accessTokenData = isAuthorized(req.cookies);
    // 인증 실패
    if (accessTokenData === null) {
      res.status(401).send('unauthorized user');
      return;
    }

    // 인증 성공
    const userId = accessTokenData.id;
    // body에서 필요한 값 받기
    const {
      content,
      dramaId,
      dramaName,
      seasonIndex,
      episodeIndex,
      episodeId,
      parentCommentId,
    } = req.body;

    // 새 댓글 객체 세팅
    let newComment = { episodeId, userId, content, parentCommentId };

    // EpisodeInfos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
    episodeInfoCreated = await EpisodeInfos.findOrCreate({
      where: { id: episodeId },
      defaults: {
        id: episodeId,
        dramaId,
        dramaName,
        seasonIndex,
        episodeIndex,
      },
    })[1];

    // 댓글을 Comments 테이블에 삽입
    const createdComment = await Comments.create(newComment);
    const { id, updatedAt, createdAt } = createdComment.dataValues;
    createdCommentId = id;
    // 응답 객체 세팅 => 댓를 정보
    const commentResponse = { id, updatedAt, createdAt };

    // 답글이 아닐 때
    if (!parentCommentId) {
      commentResponse.parentCommentId = null;
      res.status(201).json(commentResponse);
      // 답글일 때
      // 알림 테이블에 추가
    } else {
      await Notifications.create({ userId, commentId: id });
      res.status(201).json(commentResponse);
    }

    // 오류 발생 시 추가한 테이블을 제거 시도
  } catch (err) {
    if (episodeInfoCreated) {
      await EpisodeInfos.destory({
        where: { id: episodeId },
      });
      await Comments.destroy({
        where: { id: createdCommentId },
      });
    }
    await res.status(500).send(err);
  }
};
