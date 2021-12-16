import axios from 'axios';

export function getDrama(keyword) {
  return axios
    .get(
      `https://api.themoviedb.org/3/search/tv/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&query=${keyword}&include_adult=false`,
      {
        withCredentials: false,
      }
    )
    .then((result) => {
      // console.log(result);
      return result.data.results;
    });
}
