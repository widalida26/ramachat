const axios = require('axios');
const { Comments } = require('../../models');
const { Episode_infos } = require('../../models');
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
      isEmpty,
    } = req.body;

    // Episode_infos 테이블에 해당 에피소드 아이디를 가진 값이 없을 때  => 첫 댓글
    if (isEmpty) {
      // 에피소드 정보 객체 세팅
      let epiInfo = {
        id: episodeId,
        drama_id: dramaId,
        drama_name: dramaName,
        season_index: seasonIndex,
        episode_index: episodeIndex,
        comment_num: 0,
      };
      // Episode_infos 테이블에 에피소드 정보 추가
      Episode_infos.create(epiInfo)
        .then((result) => {})
        // 에피소드 정보 삽입 실패
        .catch((err) => {
          //res.status(500).send('episode information insertion failed');
        });

      // 새 댓글 객체 세팅
      let newComment = {
        episode_id: episodeId,
        user_id: userId,
        content: content,
        parent_comment_id: parentCommentId,
      };
      // 댓글을 Comments 테이블에 삽입
      Comments.create(newComment)
        .then((result) => {})
        // 댓글 정보 삽입 실패
        .catch((err) => {
          res.status(500).send('err');
        });
      // parentEpisodeId가 있을 때 => 답글 O
      if (parentCommentId) {
        console.log();
      }
      // 인증 실패
    } else {
      res.status(401).send('unauthorized user');
    }
    res.end();
  }
};

//   let drama_id = req.query['drama-id'];
//   let season_index = req.query['season-index'];
//   const episodeInfos = [];
//   Episode_info.findAll({
//     where: {
//       drama_id,
//       season_index,
//     },
//   })
//     .then((data) => {
//       // db에 해당 에피소드 정보가 있을 때
//       // sql db에서 에피소드 정보 받기
//       if (data.length > 0) {
//         for (let i = 0; i < data.length; i++) {
//           //console.log(data[i].dataValues);
//           let val = data[i].dataValues;
//           let info = {};
//           info.id = val.id;
//           info.episodeIndex = val.episode_index;
//           info.commentNum = val.comment_num;
//           episodeInfos.push(info);
//         }
//         res.status(200).json(episodeInfos);
//         // db에 해당 에피소드 정보가 없을 때
//         // tmdb에서 에피소드 정보 받기
//       } else {
//         axios
//           .get(
//             `https://api.themoviedb.org/3/tv/${drama_id}/season/${season_index}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
//             {
//               withCredentials: false,
//             }
//           )
//           .then((result) => {
//             let data = result.data.episodes;
//             for (let i = 0; i < data.length; i++) {
//               let info = {};
//               info.id = data[i].id;
//               info.episodeIndex = i + 1;
//               info.commentNum = 0;
//               episodeInfos.push(info);
//             }
//             res.status(200).json(episodeInfos);
//           })
//           .catch((err) => {
//             res.status(500).send('err');
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send('err');
//     });
