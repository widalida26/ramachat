import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import Comment from '../components/Comment';
import { getDrama, getEpisode } from '../api/DramaDataAPI';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

const Main = styled.main`
  width: 100%;
  @media ${device.tablet} {
    background-color: ${colors.white};
    height: calc(100vh - 80px);
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

const CommentsList = styled.ul`
  padding: 0;
  margin-bottom: 100px;

  @media ${device.tablet} {
    margin-bottom: 2rem;
  }
`;

export default function MyPageActivities({ tokenState }) {
  const token = tokenState ? tokenState : sessionStorage.getItem('token');
  const [myComments, setMyComments] = useState(null);
  const userId = myComments ? myComments : '댓글없다';
  // ! 댓글 없을 경우 방어코드 작성 => myComments[0].userId 못읽음
  console.log(userId);

  const getMyComment = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/activity`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        setMyComments(data.data.data);
      });
    // .catch(() => console.log('getMyComment 에러'));
  };

  console.log('유저아이디', userId);
  console.log('Comments배열', myComments);

  // 드라마, 에피소드는 API
  const [drama, setDrama] = useState({});
  // const dramaId = useParams().id;
  // const seasonNum = useParams().season;
  // const episodeNum = useParams().episode;

  // useEffect(() => {
  //   setDrama({});
  //   const sendAPICall = async () => {
  //     const data = await getDrama(dramaId);
  //     setDrama(data);
  //   };
  //   sendAPICall();
  // }, [dramaId]);

  // const [episode, setEpisode] = useState({});

  // useEffect(() => {
  //   setEpisode({});
  //   const sendAPICall = async () => {
  //     const data = await getEpisode(dramaId, seasonNum, episodeNum);
  //     setEpisode(data);
  //   };
  //   sendAPICall();
  // }, [dramaId, seasonNum, episodeNum]);

  useEffect(() => {
    getMyComment();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <span>여기는 내 활동기록</span>
        <CommentsList>
          {/* Comments */}
          {/* {myComments.map((comment) => (
            <Comment comment={comment} userId={userId} />
          ))} */}
        </CommentsList>
      </Main>
    </>
  );
}
