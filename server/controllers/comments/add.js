const { escapeId } = require('mysql');
const { Comments } = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let createdCommentId = -1; // 작성된 댓글의 아이디
  let episodeInfoCreated = false; // EpisodeInfos 테이블에 정보가 삽입되었는지 여부

  const accessTokenData = isAuthorized(req);
  // 인증 실패
  if (accessTokenData === null) {
    res.status(401).send('unauthorized user');
    return;
  }

  try {
    // 인증 성공
    const userId = accessTokenData.id;
    const {
      content,
      episodeId,
      dramaId,
      dramaName,
      seasonIndex,
      episodeIndex,
      parentCommentId,
    } = req.body; // body에서 필요한 값 받기 => 오류 발생 시 catch

    // 새 댓글 객체 세팅
    const newComment = {
      episodeId,
      userId,
      content,
      parentCommentId,
    };

    console.log(episodeId);
    // EpisodeInfos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
    const episodeInfo = await EpisodeInfos.findOrCreate({
      where: { id: episodeId },
      defaults: {
        id: episodeId,
        dramaId,
        dramaName,
        seasonIndex,
        episodeIndex,
      },
    }).then((result) => result[1]);
    console.log(episodeInfo);
    // 에피소드 정보를 찾거나 만드는데 실패했을 경우
    // if (!info) {
    //   res.status(500).send('err');
    //   return;
    // }

    let commentResponse;
    // 댓글을 Comments 테이블에 삽입
    // const createdComment = await Comments.create(newComment).catch((err) => {
    //   res.status(500).send(err);
    //   return;
    // });

    // const { id, updatedAt, createdAt } = createdComment.dataValues;
    // commentResponse = { id, updatedAt, createdAt }; // 응답 세팅
    // // 댓글 삽입에 실패할 때

    // // 답글이 아닐 때
    // if (!parentCommentId) {
    //   commentResponse.parentCommentId = null;
    //   res.status(201).json(commentResponse);
    //   return;
    // }

    // 답글일 때
    // 알림 테이블에 추가
    //await Notifications.create({ userId, commentId: id }).catch((err) => {
    //   if (created) {
    //     EpisodeInfos.destory({
    //       where: { id: episodeId },
    //     });
    //   }
    //   Comments.destroy({
    //     where: { id: createdCommentId },
    //   });
    //   res.status(500).send(err);
    //   return;
    // });
    // res.status(201).json(commentResponse);
    return;
    // 오류 발생 시 추가한 테이블을 제거 시도
    // reauest body에서 필요한 값을 읽어오지 못할 때
  } catch (err) {
    console.log(err);
    res.status(400).send('Please provide all necessary information');
    return;
  }
};
