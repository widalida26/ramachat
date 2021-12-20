import axios from 'axios';

axios.defaults.withCredentials = true;

export function getEpisodeInfos(dramaId, seasonNumber) {
  console.log('api call made');
  return axios
    .get(
      `http://ec2-3-37-218-56.ap-northeast-2.compute.amazonaws.com/episode-infos?drama-id=${dramaId}&season-index=${seasonNumber}`
    )
    .then((result) => {
      return result.data;
    });
}

export function getEpisodeComments(episodeId) {
  console.log('getting comments');
  return axios
    .get(
      `http://ec2-3-37-218-56.ap-northeast-2.compute.amazonaws.com/comments?episode-id=${episodeId}`
    )
    .then((result) => {
      return result.data.comments;
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
  // commentNum,
  parentCommentId
) {
  console.log('sending new comment');
  console.log(
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
    .post(`http://ec2-3-37-218-56.ap-northeast-2.compute.amazonaws.com/comments/add`, {
      userId: userId,
      content: content,
      dramaId: dramaId,
      dramaName: dramaName,
      seasonIndex: seasonIndex,
      episodeIndex: episodeIndex,
      episodeId: episodeId,
      // commentNum: commentNum,
      parentCommentId: parentCommentId,
    })
    .then((result) => result);
}
