//const { getDrama } = require('../../../client/src/api/DramaDataAPI');
const { Episode_info } = require('../../models');
const axios = require('axios');

module.exports = (req, res) => {
  let drama_id = req.query['drama-id'];
  let season_index = req.query['season-index'];
  const episodeInfos = [];

  console.log(Episode_info);
  Episode_info.findOne({
    where: {
      drama_id,
      season_index,
    },
  })
    .then((data) => {
      console.log(data);
      //return res.end();
    })
    .catch((err) => {
      console.log(err);
      //return res.status(500).send('err');
    });
  // db에 해당 에피소드 정보가 없을 때
  // tmdb에서 해당 드라마 정보 받기

  axios
    .get(
      `https://api.themoviedb.org/3/tv/${drama_id}/season/${season_index}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      let data = result.data.episodes;
      //console.log(data);
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
};
