const { Likes } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  let liked = false; // Likes 테이블에 정보가 삽입되었는지 여부
  let newLike = {}; // 좋아요 객체

  //   try {
  //     const accessTokenData = isAuthorized(req.cookies);
  //     // 인증 실패
  //     if (accessTokenData === null) {
  //       res.status(401).send('unauthorized user');
  //       return;
  //     } catch {

  //     }
};

// 인증 성공
// 좋아요 객체 세팅
//     userId = accessTokenData.id;
//     targetId = req.params.commentId;
//     newLike = { userId, targetId };

//     // 좋아요 정보 삽입
//     liked = await Likes.findOrCreate({
//       where: newLike,
//       defaults: newLike,
//     }).then((result) => {
//       // isNewRecord?
//       if (!result[1]) {
//         Likes.destroy({ where: { id: result[0].dataValues.id } }); // 좋아요가 있을 경우 취소
//         return false;
//       } else return true;
//     });

//     res.status(201).json({ liked });
//   } catch (err) {
//     // 에러 발생 시 반영된 좋아요를 취소
//     // findOrCreate의 결과가 반환되지 않을 때(liked === false)는 기존에 좋아요가 있는지 없는지 알 수 없음
//     // ㅣiked === fasle일 때(sequelize error or 좋아요 취소 요청)는 작업 취소가 어려움
//     if (liked) {
//       await Likes.destroy({ where: newLike });
//     }
//     await res.status(500).send(err);
//   }
