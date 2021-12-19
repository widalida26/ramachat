import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCommentDots, faBell } from '@fortawesome/free-regular-svg-icons';

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  justify-content: left;
  align-items: center;

  /* 아이콘 스타일 */
  font-size: 2rem;
  /* color: ${colors.white}; */
  padding: 1.3rem;
  cursor: pointer;

  @media ${device.tablet} {
    background-color: ${colors.primaryL};
    height: calc(100vh - 80px);
    display: flex;
    justify-content: left;
    align-items: left;
  }
`;

const primaryL = colors.primaryL;
console.log(`${primaryL}`);

export default function Tabbar() {
  return (
    <TabContainer>
      <Link to="/mypage/personal-information">
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: `${primaryL}`, marginBottom: '20px' }}
        />
      </Link>
      <Link to="/mypage/my-activities">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ color: '#FFF', marginBottom: '20px' }}
        />
      </Link>
      <Link to="/mypage/notifications">
        <FontAwesomeIcon icon={faBell} />
      </Link>
    </TabContainer>
  );
}
