require('dotenv').config();
const { Users, Comments, Likes, EpisodeInfos, Notifications } = require('../../models');

module.exports = {
  CommentsDelete: (data) => {
    Comments.destroy({
      where: {
        userId: data.id,
      },
    });
  },
  EpisodeInfosDelete: (data) => {
    EpisodeInfos.destroy({
      where: {
        userId: data.id,
      },
    });
  },
  UsersDelete: (data) => {
    Users.destroy({
      where: {
        userId: data.userId,
      },
    });
  },
  CommentsFindAll: (data) => {
    Comments.findAll({
      where: {
        userId: data.id,
      },
    });
  },
};
