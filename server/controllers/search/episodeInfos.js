const db = require('../../models');
const { EpisodeInfos } = require('../../models');
const { Comments } = require('../../models');
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    let dramaId = req.query['drama-id'];
    let seasonIndex = req.query['season-index'];

    const episodeInfos = [];
    const storedEpisodes = await EpisodeInfos.findAll({
      attributes: {
        include: [
          [
            db.sequelize.literal(
              `(SELECT COUNT(*)
                  FROM Comments
                  WHERE
                  EpisodeInfos.id = Comments.episodeId)`
            ),
            'commentNum',
          ],
        ],
      },
    });
    // db에 해당 에피소드 정보가 없을 때
    // tmdb에서 에피소드 정보 받기
    if (storedEpisodes.length === 0) {
      const searched = await axios.get(
        `https://api.themoviedb.org/3/tv/${dramaId}/season/${seasonIndex}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
        {
          withCredentials: false,
        }
      );

      // 반환 객체 세팅 => 에피소드 정보
      const episodes = searched.data.episodes;
      for (let i = 0; i < episodes.length; i++) {
        let info = {};
        info.id = episodes[i].id;
        info.episodeIndex = i + 1;
        info.commentNum = 0;
        episodeInfos.push(info);
      }
      // db에 해당 에피소드 정보가 있을 때
      // sql db에서 에피소드 정보 받기
    } else {
      // 반환 객체 세팅 => 에피소드 정보
      for (let i = 0; i < storedEpisodes.length; i++) {
        const { id, episodeIndex, commentNum } = storedEpisodes[i].dataValues;
        let info = {
          id,
          episodeIndex,
          commentNum,
        };
        episodeInfos.push(info);
      }
    }
    res.status(200).json(episodeInfos);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
