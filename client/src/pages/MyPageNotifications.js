import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import Notification from '../components/Notification';

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

export default function MyPageNotifications() {
  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <Notification></Notification>
      </Main>
    </>
  );
}
