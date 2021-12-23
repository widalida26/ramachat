import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import TextButton from '../components/TextButton';
import InputForm from '../components/InputForm';
import Modal from '../components/Modal';
import { useEffect, useState } from 'react';

const Section = styled.section`
  margin-left: 60px;
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  border-right: 1px solid ${colors.primary};
  p {
    line-height: 2.5;
  }
  @media ${device.tablet} {
    margin-left: 240px;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  display: flex;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 1rem;
`;

axios.defaults.withCredentials = true;

export default function MyPagePersonal({ tokenState, handleLogout }) {
  const [isChange, setIsChange] = useState(false);
  const [myPageInfo, setMyPageInfo] = useState(null);
  const userId = myPageInfo ? myPageInfo.userId : '';
  const email = myPageInfo ? myPageInfo.email : '';
  const token = tokenState ? tokenState : sessionStorage.getItem('token');

  // 비밀번호 변경
  // ! 유효성 검사 추가?
  const [passwordInfo, setPasswordInfo] = useState({
    nowPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const openChangePassword = () => {
    setIsChange(!isChange);
  };

  const handleInputValue = (target) => (e) => {
    setPasswordInfo({ ...passwordInfo, [target]: e.target.value });
  };

  const getMyPage = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/userInfo`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + token,
        },
        withCredentials: true,
      })
      .then((res) => {
        setMyPageInfo(res.data.data.userInfo);
      })
      .catch(() => console.log('getMyPage 에러'));
  };

  const changePassword = () => {
    // 비밀번호 변경 성공 모달띄우기...
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/passwordModify`,
        {
          withCredentials: true,
          password: passwordInfo.nowPassword,
          newPassword: passwordInfo.newPassword,
        },
        {
          headers: {
            'Content-Type': `application/json`,
            authorization: 'Bearer ' + tokenState,
          },
        }
      )
      .then(() => setIsOpen(!isOpen)) // 비밀번호 변경 버튼 클릭시 모달 열기
      .catch(() => console.log('changePassword 에러'));
  };

  const signOut = () => {
    // 회원탈퇴 성공 모달띄우기...
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/signout`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: 'Bearer ' + tokenState,
        },
        withCredentials: true,
      })
      .then(() => {
        setIsOpen(!isOpen); // 회원탈퇴 버튼 클릭시 모달 열기
        handleLogout(); // 로그아웃 처리
      })
      .catch(() => console.log('signOut 에러'));
  };

  // 모달 코드
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getMyPage();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <Section>
          <h1>My Page</h1>
          <p>
            User Id : {userId}
            <br />
            E-mail : {email}
          </p>
          {isChange ? (
            <div>
              <Form>
                <InputForm
                  label="현재 패스워드"
                  target="nowPassword"
                  type="password"
                  handleInputValue={handleInputValue}
                ></InputForm>
                <InputForm
                  label="새 패스워드"
                  target="newPassword"
                  type="password"
                  handleInputValue={handleInputValue}
                ></InputForm>
                <InputForm
                  label="새 패스워드 확인"
                  target="newPasswordConfirm"
                  type="password"
                  handleInputValue={handleInputValue}
                ></InputForm>
                <br />
                <TextButton
                  color="secondary"
                  isTransparent={false}
                  onClick={changePassword}
                >
                  변경하기
                </TextButton>
              </Form>
              <Modal
                isOpen={isOpen}
                openModalHandler={openModalHandler}
                modalActionlHandler={openModalHandler}
                noticeMessage={'비밀번호 변경이 완료되었습니다!'}
                buttonMessage={'확인'}
                endPoint={'/mypage/personal-information'}
              />
            </div>
          ) : (
            <>
              <TextButton
                color="secondary"
                isTransparent={false}
                width="fit"
                onClick={openChangePassword}
              >
                Change Password
              </TextButton>
              <br />
              <TextButton
                color="secondary"
                isTransparent={true}
                width="fit"
                onClick={signOut}
              >
                Sign out
              </TextButton>
              <Modal
                isOpen={isOpen}
                openModalHandler={openModalHandler}
                modalActionlHandler={openModalHandler}
                noticeMessage={'회원 탈퇴가 완료되었습니다!'}
                buttonMessage={'홈으로 가기'}
                endPoint={'/'}
              />
            </>
          )}
        </Section>
      </Main>
    </>
  );
}
