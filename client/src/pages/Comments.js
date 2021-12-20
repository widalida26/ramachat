import styled from 'styled-components';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDrama, getEpisode } from '../api/DramaDataAPI';
import { getEpisodeComments } from '../api/CommentsDataAPI';
import { device } from '../styles/Breakpoints';
import { colors } from '../styles/Colors';

const Main = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 850px;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;

  @media ${device.tablet} {
    grid-template-columns: 240px 1fr;
  }
`;

const EpisodeInfo = styled.article`
  h4 {
    color: ${colors.grey};
  }
`;

const Still = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 66%;
  background-color: ${colors.greyL};
  background-image: url(${(props) => props.still});
  background-size: cover;
  background-position: center center;

  @media ${device.tablet} {
    width: 100%;
    padding-bottom: 66%;
  }
`;

const CommentsContainer = styled.div`
  /* position: relative; */
`;

const CommentsList = styled.ul`
  padding: 0;
  margin-bottom: 100px;

  @media ${device.tablet} {
    margin-bottom: 2rem;
  }
`;

export default function Comments({ userInfo }) {
  // const comments = [
  //   {
  //     id: 123,
  //     episodeId: 1020,
  //     userId: 'alexJ',
  //     content:
  //       'I’ve been looking forward to the new season for such a long time! Finally,Sherlock and Watson are back!',
  //     likeNum: 10,
  //     replyNum: 2,
  //     createdAt: '2021-12-12',
  //     modifiedAt: '2021-12-13',
  //   },
  //   {
  //     id: 124,
  //     episodeId: 1020,
  //     userId: 'lewis',
  //     content: 'It was bit disappointing.',
  //     likeNum: 2,
  //     replyNum: 0,
  //     createdAt: '2021-12-14',
  //     modifiedAt: '2021-12-15',
  //   },
  // ];

  const [drama, setDrama] = useState({});
  const dramaId = useParams().id;
  const seasonNum = useParams().season;
  const episodeNum = useParams().episode;

  useEffect(() => {
    setDrama({});
    const sendAPICall = async () => {
      const data = await getDrama(dramaId);
      setDrama(data);
    };
    sendAPICall();
  }, [dramaId]);

  const [episode, setEpisode] = useState({});

  useEffect(() => {
    setEpisode({});
    const sendAPICall = async () => {
      const data = await getEpisode(dramaId, seasonNum, episodeNum);
      setEpisode(data);
    };
    sendAPICall();
  }, [dramaId, seasonNum, episodeNum]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments([]);
    const sendAPICall = async () => {
      const data = await getEpisodeComments(episode.id);
      setComments(data);
    };
    sendAPICall();
  }, [episode]);

  const userId = userInfo ? userInfo.id : undefined;

  const url =
    episode.still_path === null
      ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/624px-No-Image-Placeholder.svg.png'
      : 'https://www.themoviedb.org/t/p/w1280' + episode.still_path;

  return (
    <Main>
      <EpisodeInfo>
        {/* Episode Info */}
        <h1>{drama.name}</h1>
        <h4>{drama.original_name}</h4>
        <h3>
          Season {seasonNum} - Episode {episodeNum} : {episode.name}
        </h3>
        <Still still={url}></Still>
        <p>{episode.overview}</p>
      </EpisodeInfo>
      <CommentsContainer>
        <CommentsList>
          {/* Comments */}
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </CommentsList>
        <CommentForm
          userId={userId}
          dramaId={drama.id}
          dramaName={drama.name}
          seasonIndex={episode.season_number}
          episodeIndex={episode.episode_number}
          episodeId={episode.id}
          // commentNum={comments.length}
        />
      </CommentsContainer>
    </Main>
  );
}
