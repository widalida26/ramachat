import axios from 'axios';

axios.defaults.withCredentials = true;

export function getEpisodeInfos(dramaId, seasonNumber) {
  console.log('api call made');
  return axios
    .get(
      `http://localhost:8000/episode-infos?drama-id=${dramaId}&season-index=${seasonNumber}`
    )
    .then((result) => {
      return result.data;
    });
}

export function getEpisodeComments(episodeId) {
  console.log('getting comments');
  return axios
    .get(`http://localhost:8000/comments?episode-id=${episodeId}`)
    .then((result) => {
      return result.comments;
    });
}

export function postComment(
  userId,
  content,
  dramaId,
  dramaName,
  seasonIndex,
  episodeIndex,
  episodeId,
  commentNum,
  parentCommentId
) {
  console.log('sending new comment');
  return axios
    .post(`http://localhost:8000/comments`, {
      userId,
      content,
      dramaId,
      dramaName,
      seasonIndex,
      episodeIndex,
      episodeId,
      commentNum,
      parentCommentId,
    })
    .then((result) => result);
}
