const sequelize = require('sequelize');
const { like } = require('sequelize/dist/lib/operators');
const { Comments } = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Notifications } = require('../../models');
const { Likes } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let liked = false; // Likes 테이블에 정보가 삽입되었는지 여부
  let userId = -1; // 좋아요한 사용자 아이디
  let targetId = -1; // 좋아요된 댓글 아이디

  try {
    const accessTokenData = isAuthorized(req.cookies);
    // 인증 실패
    if (accessTokenData === null) {
      res.status(401).send('unauthorized user');
      return;
      // 인증 성공
    }
    userId = accessTokenData.id;
    targetId = req.body.targetId;
    liked = await Likes.findOrCreate({
      where: { userId, targetId },
      defaults: {
        userId,
        findId,
      },
    })[1];
    res.status(201).json({ liked });
  } catch (err) {
    await Likes.destory({
      where: { userId, targetId },
    });
    await res.status(500).send(err);
  }
  res.end();
};
