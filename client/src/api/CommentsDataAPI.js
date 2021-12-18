import axios from 'axios';

export function getEpisodeInfos(dramaId, seasonNumber) {
  console.log('api call made');
  return axios
    .get(
      `http://localhost:8000/episode-infos?drama-id=${dramaId}&season-index=${seasonNumber}`,
      {
        withCredentials: true,
      }
    )
    .then((result) => {
      return result.data;
    });
}
