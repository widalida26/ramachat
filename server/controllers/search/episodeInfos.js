const { EpisodeInfos } = require('../../models');

const axios = require('axios');

module.exports = async (req, res) => {
  let dramaId = req.query['drama-id'];
  let seasonIndex = req.query['season-index'];
  const episodeInfos = [];

  // const searchedEpisodes = await EpisodeInfos.findAll({ where: dramaId, seasonIndex });
  //   //for (let i = )
  // }

  EpisodeInfos.findAll({
    where: {
      dramaId,
      seasonIndex,
    },
  })
    .then((data) => {
      // db에 해당 에피소드 정보가 있을 때
      // sql db에서 에피소드 정보 받기
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const { id, episodeIndex, commentNum } = data[i].dataValues;
          console.log('commentNum', commentNum);
          let info = {
            id,
            episodeIndex,
            commentNum,
          };
          episodeInfos.push(info);
        }
        res.status(200).json(episodeInfos);
        // db에 해당 에피소드 정보가 없을 때
        // tmdb에서 에피소드 정보 받기
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${dramaId}/season/${seasonIndex}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            {
              withCredentials: false,
            }
          )
          .then((result) => {
            let data = result.data.episodes;
            for (let i = 0; i < data.length; i++) {
              let info = {};
              info.id = data[i].id;
              info.episodeIndex = i + 1;
              info.commentNum = 0;
              episodeInfos.push(info);
            }
            res.status(200).json(episodeInfos);
          })
          .catch((err) => {
            res.status(500).send('err');
          });
      }
    })
    .catch((err) => {
      res.status(500).send('err');
    });
};
