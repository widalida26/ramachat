import styled from 'styled-components';
import TextButton from './TextButton';
import LogoButton from './LogoButton';
import { Link } from 'react-router-dom';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${colors.primary};

  nav {
    width: 850px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

function Navbar({ isLogin, handleLogout }) {
  return (
    <div>
      <NavContainer>
        <nav>
          <Link to="/">
            <LogoButton />
          </Link>
          {isLogin ? (
            <ButtonGroup>
              {/* mypage 생성시 Link 컴포넌트 추가 */}
              <div onClick={handleLogout}>
                <TextButton color="white" isTransparent={true} width="fit">
                  LOG OUT
                </TextButton>
              </div>
              <TextButton color="secondary" isTransparent={false} width="fit">
                MY PAGE
              </TextButton>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Link to="/login">
                <TextButton color="white" isTransparent={true} width="fit">
                  LOG IN
                </TextButton>
              </Link>
              <Link to="/signup">
                <TextButton color="secondary" isTransparent={false} width="fit">
                  SIGN UP
                </TextButton>
              </Link>
            </ButtonGroup>
          )}
        </nav>
      </NavContainer>
    </div>
  );
}

export default Navbar;
