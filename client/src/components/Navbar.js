import styled from 'styled-components';
import TextButton from './TextButton';
import LogoButton from './LogoButton';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  // 모달 코드
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    handleLogout();
    setIsOpen(!isOpen);
  };

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
              <div onClick={openModalHandler}>
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
      <Modal
        isOpen={isOpen}
        openModalHandler={openModalHandler}
        noticeMessage={'정상적으로 로그아웃이 완료되었습니다!'}
        buttonMessage={'홈으로 가기'}
        endPoint={'/'}
      />
    </div>
  );
}

export default Navbar;
