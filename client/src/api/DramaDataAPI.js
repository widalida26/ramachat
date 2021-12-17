const axios = require('axios');

export function getDramas(keyword) {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&query=${keyword}&include_adult=false`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      // console.log(result) ;
      return result.data.results;
    });
}

export function getDrama(dramaId) {
  return axios
    .get(
      `https://api.themoviedb.org/3/tv/${dramaId}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      console.log(result);
      return result.data;
    });
}

export function getEpisodes(dramaId, seasonIdx) {
  return axios
    .get(
      `https://api.themoviedb.org/3/tv/${dramaId}/season/${seasonIdx}?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      console.log(result);
      return result.data.episodes;
    });
}
