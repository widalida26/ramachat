const { Comments } = require('../../models');

module.exports = (req, res) => {
  const episodeId = req.query['episode-id'];
  Comments.findAll({
    where: {
      episodeId,
    },
  })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {}
      console.log(result);
      console.log(result.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  console.log(episodeId);

  res.end();
};

// Episode_infos.findAll({
//     where: {
//       id: episodeId,
//     },
//   })
//     .then((data) => {
//       // db에 해당 에피소드 정보가 없을 때
//       // Episode_info 테이블에 에피소드 정보 추가
//       if (data.length === 0) {
//         console.log('nothing');
//       } else {
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       //res.status(500).send('err');
//     });

// axios
//   .get(
//     `https://api.themoviedb.org/3/tv/${drama_id}/season/${season_index}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
//     {
//       withCredentials: false,
//     }
//   )
//   .then((result) => {
//     let data = result.data.episodes;
//     for (let i = 0; i < data.length; i++) {
//       let info = {};
//       info.id = data[i].id;
//       info.episodeIndex = i + 1;
//       info.commentNum = 0;
//       episodeInfos.push(info);
//     }
//     res.status(200).json(episodeInfos);
//   })
//   .catch((err) => {
//     res.status(500).send('err');
//   });
