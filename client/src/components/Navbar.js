import styled from 'styled-components';
import TextButton from './TextButton';
import LogoButton from './LogoButton';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  display: flex;
  border: 2px solid black;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

function Navbar({ isLogin, handleLogout }) {
  return (
    <div>
      {isLogin ? (
        <nav>
          <NavContainer>
            <Link to="/">
              <LogoButton />
            </Link>
            <ButtonGroup>
              {/* mypage 생성시 Link 컴포넌트 추가 */}
              <TextButton>mypage</TextButton>
              <div onClick={handleLogout}>
                <TextButton>logout</TextButton>
              </div>
            </ButtonGroup>
          </NavContainer>
        </nav>
      ) : (
        <nav>
          <NavContainer>
            <Link to="/">
              <LogoButton />
            </Link>
            <ButtonGroup>
              <Link to="/signup">
                <TextButton>signup</TextButton>
              </Link>
              <Link to="/login">
                <TextButton>login</TextButton>
              </Link>
            </ButtonGroup>
          </NavContainer>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
