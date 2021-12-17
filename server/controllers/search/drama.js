//const { getDrama } = require('../../../client/src/api/DramaDataAPI');
const axios = require('axios');

module.exports = (req, res) => {
  let dramaId = req.query['drama-id'];
  console.log(process.env.TMDB_API_KEY);
  console.log(dramaId);
  // const episodeInfo = {
  //   'id': 'id',
  //   'dramaId'
  // };
  axios
    .get(
      `https://api.themoviedb.org/3/tv/1339?api_key=12020cc123e40be63cf1fc64c2795f38&language=en-US`,
      //`https://api.themoviedb.org/3/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=${keyword}&include_adult=false`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  //     .then((result) => {
  //       // console.log(result);
  //       return result.data.results;
  //     });
  // const sendAPICall = aysnc () => {
  // const info = await getDrama();
  // }
  res.end();
  //   console.log(444, Users);
  //   console.log(666, req.body);
  //   const { user_id, password } = req.body;
  //   console.log(555, user_id, password);
  //   Users.findOne({
  //     where: {
  //       user_id,
  //       password,
  //     },
  //   })
  //     .then((data) => {
  //       console.log(999, data);
  //       if (!data) {
  //         return res.status(404).send('invalid user');
  //       } else {
  //         delete data.dataValues.password;
  //         const accessToken = generateAccessToken(data.dataValues);
  //         sendAccessToken(res, accessToken);
  //       }
  //     })
  //     .catch((err) => {
  //       return res.status(500).send('err');
  //       console.log(err);
  //     });
};
