import Tabbar from '../components/Tabbar';
import axios from 'axios';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import TextButton from '../components/TextButton';
import InputForm from '../components/InputForm';
import { useEffect, useState } from 'react';

const Main = styled.main`
  width: 100%;
  @media ${device.tablet} {
    background-color: ${colors.white};
    height: calc(100vh - 80px);
    display: flex;
  }

  section {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding-left: 20px;
    padding-top: 20px;
  }
`;

axios.defaults.withCredentials = true;

export default function MyPagePersonal() {
  const [isChange, setIsChange] = useState(false);
  const [myPageInfo, setMyPageInfo] = useState(null);
  const userId = myPageInfo ? myPageInfo.userId : '';
  const email = myPageInfo ? myPageInfo.email : '';

  // const [nowPassword, setNowPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  // 비밀번호 변경
  // ! 유효성 검사 추가?
  // ! 비밀번호 확인
  const [passwordInfo, setPasswordInfo] = useState({
    nowPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  // console.log(isChange);
  console.log(passwordInfo);

  const openChangePassword = () => {
    setIsChange(!isChange);
  };

  const handleInputValue = (target) => (e) => {
    setPasswordInfo({ ...passwordInfo, [target]: e.target.value });
    // console.log(loginInfo);
  };

  const getMyPage = () => {
    axios
      .get('http://localhost:8000/userInfo')
      .then((res) => {
        setMyPageInfo(res.data.data.userInfo);
      })
      .catch(() => console.log('getMyPage 에러'));
  };

  const changePassword = () => {
    // 비밀번호 변경 성공 모달띄우기...
    axios
      .put('http://localhost:8000/modify', {
        password: passwordInfo.nowPassword,
        newPassword: passwordInfo.newPassword,
      })
      .then((data) => {
        console.log(data);
      })
      .catch(() => console.log('changePassword 에러'));
  };

  const signOut = () => {
    // 회원탈퇴 성공 모달띄우기...
    axios
      .delete('http://localhost:8000/signout')
      .then((data) => {
        console.log(data);
      })
      .catch(() => console.log('signOut 에러'));
  };

  useEffect(() => {
    getMyPage();
  }, []);

  return (
    <>
      <Main>
        <Tabbar></Tabbar>
        <section>
          <h1>My Page</h1>
          <p>User Id : {userId}</p>
          <p>E-mail : {email}</p>
          {isChange ? (
            <>
              <p>Now Password</p>
              <InputForm
                target="nowPassword"
                type="password"
                handleInputValue={handleInputValue}
              ></InputForm>
              <p>New Password</p>
              <InputForm
                target="newPassword"
                type="password"
                handleInputValue={handleInputValue}
              ></InputForm>
              <p>New Password Confirmation</p>
              <InputForm
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
                Change
              </TextButton>
            </>
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
            </>
          )}
        </section>
      </Main>
    </>
  );
}
