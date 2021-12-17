//const { getDrama } = require('../../../client/src/api/DramaDataAPI');
const { epiosode_info } = require('../../models/episode_info');
const axios = require('axios');

module.exports = (req, res) => {
  let dramaId = req.query['drama-id'];
  let seasonIndex = 1;
  console.log(process.env.TMDB_API_KEY);
  console.log(dramaId);

  // const dramaInfo = {
  //   title: '',
  //   year: '',
  //   genres: [],
  //   overview: '',
  //   seasonNum: '',
  //   episodeNum: '',
  // };
  const episodeInfos = [];
  const episodeInfo = {
    id: '',
    dramaId: '',
    dranaName: '',
    seasonIndex: '',
    episodeIndex: '',
    commentNum: '',
  };
  console.log(epiosode_info);
  res.end();
  // epiosode_info
  //   .findOne({
  //     where: {},
  //   })
  //   .then((data) => {
  //     return res.end();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).send('err');
  //   });
  // db에 해당 에피소드 정보가 없을 때
  // tmdb에서 해당 드라마 정보 받기

  // axios
  //   .get(
  //     `https://api.themoviedb.org/3/tv/${dramaId}/season/${seasonIndex}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  //     //`https://api.themoviedb.org/3/tv/${dramaId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  //     //`https://api.themoviedb.org/3/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=${keyword}&include_adult=false`,
  //     {
  //       withCredentials: false,
  //     }
  //   )
  //   .then((result) => {
  //     let data = result.data.episodes;
  //     console.log(data);
  //     for (let i = 0; i < data.length; i++) {
  //       let info = {};
  //       info.id = data[i].id;
  //       info.dramaId = dramaId;
  //       info.seasonIndex = seasonIndex;
  //       info.episodeIndex = i + 1;
  //       info.commentNum = 0;
  //       episodeInfos.push(info);
  //     }
  //     res.status(200).json(episodeInfos);

  //     // let data = result.data;
  //     // dramaInfo.title = data.name;
  //     // dramaInfo.year = data.first_air_date.slice(0, 4);
  //     // let genres = data.genres;
  //     // genres.forEach((genre) => {
  //     //   dramaInfo.genres.add(genre.name);
  //     // });
  //     // dramaInfo.overview = data.overview;
  //     // //dramaInfo.seasonNum = data.seasonNum;
  //     // let seasons = data.seasons;
  //     // for (let i = 0; i < seasons.length; i++) {}
  //     // //dramaInfo.episodeNums =
  //     // console.log(dramaInfo);
  //   })
  //   .catch((err) => {
  //     res.status(500).send('err');
  //   });
};
