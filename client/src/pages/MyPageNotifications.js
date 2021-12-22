import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import Notification from '../components/Notification';
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

export default function MyPageNotifications({ tokenState }) {
  const token = tokenState ? tokenState : sessionStorage.getItem('token');
  const [myComments, setMyComments] = useState({});
  const commentsArray = myComments ? myComments : undefined;
  // console.log('Comments', Object.values(myComments));
  console.log(commentsArray);

  const getMyComment = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/notification`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        setMyComments(data.data.data);
      })
      .catch(() => console.log('getMyComment 에러'));
  };

  useEffect(() => {
    getMyComment();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <Notification></Notification>
      </Main>
    </>
  );
}
