import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';

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

export default function MyPageTemp() {
  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <span>여기는 내 활동기록</span>
      </Main>
    </>
  );
}
