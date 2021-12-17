import styled from 'styled-components';
import { colors } from '../styles/Colors';

const Item = styled.li`
  list-style: none;
  display: grid;
  grid-template-columns: 150px 1fr 60px;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  border-top: 1px solid ${colors.primary};
  &:hover {
    background-color: ${colors.primaryL};
  }

  .still {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 66%;
    background-color: ${colors.greyL};
    background-image: url(${(props) => props.still});
    background-size: cover;
    background-position: center center;
  }
  h4 {
    margin: 0;
  }
  .overview {
    grid-column: 1 / span 3;
  }
  .comment {
    margin: 0;
    text-align: right;
    color: ${colors.primary};
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
      <div className="still"></div>
      <h4>
        {episode.episode_number}. {episode.name}
      </h4>
      <p className="comment">
        <i className="fas fa-comment-alt"></i> {commentNum}
      </p>
      {episode.overview ? <p className="overview">{episode.overview}</p> : null}
    </Item>
  );
}
