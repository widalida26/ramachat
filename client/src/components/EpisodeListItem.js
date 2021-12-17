import styled from 'styled-components';
import { colors } from '../styles/Colors';

const Item = styled.li`
  list-style: none;

  .still {
    position: relative;
    width: 150px;
    height: 100px;
    background-color: ${colors.greyL};
    background-image: url(${(props) => props.still});
    background-size: cover;
    background-position: center center;
  }
`;

export default function EpisodeListItem({ episode, episodeInfos }) {
  const url =
    episode.still_path === null
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png'
      : 'https://www.themoviedb.org/t/p/w1280' + episode.still_path;
  const filteredInfos = episodeInfos.filter(
    (ep) => ep.episodeIndex == episode.episode_number
  );
  const commentNum = filteredInfos.length !== 0 ? filteredInfos[0].commentNum : '0';
  return (
    <Item still={url}>
      <h3>{episode.episode_number}</h3>
      <div className="still"></div>
      <h4>{episode.name}</h4>
      <p>{episode.overview}</p>
      <p>Comments: {commentNum}</p>
    </Item>
  );
}
