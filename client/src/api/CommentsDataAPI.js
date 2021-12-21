import axios from 'axios';

axios.defaults.withCredentials = true;

export function getEpisodeInfos(dramaId, seasonNumber) {
  console.log('api call made');
  return axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/episode-infos?drama-id=${dramaId}&season-index=${seasonNumber}`
    )
    .then((result) => {
      return result.data;
    });
}

export function getEpisodeComments(episodeId) {
  console.log('getting comments', episodeId);
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/comments?episode-id=${episodeId}`)
    .then((result) => {
      return result.data.comments;
    });
}

export function postComment(
  tokenState,
  userId,
  content,
  dramaId,
  dramaName,
  seasonIndex,
  episodeIndex,
  episodeId,
  // commentNum,
  parentCommentId
) {
  console.log('sending new comment');
  console.log(
    tokenState,
    userId,
    content,
    dramaId,
    dramaName,
    seasonIndex,
    episodeIndex,
    episodeId,
    // commentNum,
    parentCommentId
  );
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/comments/add`,
      {
        userId: userId,
        content: content,
        dramaId: dramaId,
        dramaName: dramaName,
        seasonIndex: seasonIndex,
        episodeIndex: episodeIndex,
        episodeId: episodeId,
        // commentNum: commentNum,
        parentCommentId: parentCommentId,
      },
      {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + tokenState,
        },
      }
    )
    .then((result) => result);
}

export function deleteComment(commentId) {
  return axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`)
    .then((result) => {
      console.log(result);
      return result;
    });
}
