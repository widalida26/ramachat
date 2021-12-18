module.exports = {
  login: require('./users/login'),
  signup: require('./users/signup'),
  auth: require('./users/auth'),
  userInfo: require('./myInfos/userInfo'),
  logout: require('./users/logout'),
  modify: require('./myInfos/modify'),
  episodeInfos: require('./search/episodeInfos'),
  comments: require('./search/comments'),
  add: require('./comments/add'),
};
