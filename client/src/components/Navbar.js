import styled from 'styled-components';
import TextButton from './TextButton';
import LogoButton from './LogoButton';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
  // 모달 코드
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    handleLogout();
    setIsOpen(!isOpen);
  };

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
        <Modal
          isOpen={isOpen}
          openModalHandler={openModalHandler}
          noticeMessage={'정상적으로 로그아웃이 완료되었습니다!'}
          buttonMessage={'홈으로 가기'}
          endPoint={'/'}
        />
      </NavContainer>
    </div>
  );
}

export default Navbar;
