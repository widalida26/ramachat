const { EpisodeInfos } = require('../../models');
const { addNewComment } = require('./commentFunctions');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req.cookies);
  // 인증 성공
  if (accessTokenData !== null) {
    // body에서 필요한 값 받기
    const {
      userId,
      content,
      dramaId,
      dramaName,
      seasonIndex,
      episodeIndex,
      episodeId,
      parentCommentId,
      commentNum,
    } = req.body;

    // 새 댓글 객체 세팅
    let newComment = {
      episodeId,
      userId,
      content,
      parentCommentId,
    };

    // EpisodeInfos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
    if (commentNum === 0) {
      // 에피소드 정보 객체 세팅
      let epiInfo = {
        id: episodeId,
        dramaId,
        dramaName,
        seasonIndex,
        episodeIndex,
      };

      // EpisodeInfos 테이블에 에피소드 정보 추가
      EpisodeInfos.create(epiInfo)
        .then((result) => {
          addNewComment(newComment, episodeId, res);
        })
        // 에피소드 정보 삽입 실패
        .catch((err) => {
          res.status(500).send(err);
        });
      // 첫 댓글이 아닐 때
    } else {
      // 댓글을 Comments 테이블에 삽입
      addNewComment(newComment, episodeId, res);
    }
    // 인증 실패
  } else {
    res.status(401).send('unauthorized user');
  }
};
