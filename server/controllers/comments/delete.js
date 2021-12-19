const { Comments } = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Notifications } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const commentId = req.query;
  console.log(commentId);
  res.end();
  //   try {
  //     const accessTokenData = isAuthorized(req.cookies);
  //     // 인증 실패
  //     if (accessTokenData === null) {
  //       res.status(401).send('unauthorized user');
  //       // 인증 성공
  //     } else {
  //       // 토큰 인증
  //       // 새 댓글 객체 세팅
  //       let newComment = { episodeId, userId, content, parentCommentId };
  //       // EpisodeInfos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
  //       if (commentNum === 0) {
  //         // 에피소드 정보 객체 세팅
  //         let episodeInfo = {
  //           id: episodeId,
  //           dramaId,
  //           dramaName,
  //           seasonIndex,
  //           episodeIndex,
  //         };
  //         await EpisodeInfos.create(episodeInfo);
  //       }
  //       // 댓글을 Comments 테이블에 삽입
  //       const createdComment = await Comments.create(newComment);
  //       const { id, updatedAt, createdAt } = createdComment.dataValues;
  //       // 응답 객체 세팅 => 댓를 정보
  //       const commentResponse = {
  //         id,
  //         episodeId,
  //         userId,
  //         content,
  //         updatedAt,
  //         createdAt,
  //         parentCommentId,
  //       };
  //       // 답글이 아닐 때
  //       if (!parentCommentId) {
  //         commentResponse.parentCommentId = null;
  //         res.status(201).json(commentResponse);
  //         // 답글일 때
  //         // 알림 테이블에 추가
  //       } else {
  //         await Notifications.create({ userId, commentId: id });
  //         res.status(201).json(commentResponse);
  //       }
  //     }
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
};
