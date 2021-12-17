//const { getDrama } = require('../../../client/src/api/DramaDataAPI');
const { Episode_info } = require('../../models');
const axios = require('axios');

module.exports = (req, res) => {
  let drama_id = req.query['drama-id'];
  let season_index = req.query['season-index'];
  const episodeInfos = [];

  Episode_info.findAll({
    where: {
      drama_id,
      season_index,
    },
  })
    .then((data) => {
      // db에 해당 에피소드 정보가 있을 때
      // sql db에서 에피소드 정보 받기
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].dataValues);
          let val = data[i].dataValues;
          let info = {};
          info.id = val.id;
          info.episodeIndex = val.episode_index;
          info.commentNum = val.comment_num;
          episodeInfos.push(info);
        }
        res.status(200).json(episodeInfos);
        // db에 해당 에피소드 정보가 없을 때
        // tmdb에서 에피소드 정보 받기
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${drama_id}/season/${season_index}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
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
