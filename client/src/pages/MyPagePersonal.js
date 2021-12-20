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

  // console.log(isChange);
  console.log(myPageInfo);

  const openChangePassword = () => {
    setIsChange(!isChange);
  };

  const handleInputValue = (target) => (e) => {
    // setLoginInfo({ ...loginInfo, [target]: e.target.value });
    // console.log(loginInfo);
  };

  const getMyPage = () => {
    axios
      .get('http://localhost:8000/userInfo')
      .then((res) => {
        setMyPageInfo(res.data.data.userInfo);
      })
      .catch(() => console.log('에러다'));
  };

  const changePassword = () => {
    console.log('변경');
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
                target="password"
                type="password"
                handleInputValue={handleInputValue}
              ></InputForm>
              <p>New Password</p>
              <InputForm
                target="password"
                type="password"
                handleInputValue={handleInputValue}
              ></InputForm>
              <p>New Password Confirmation</p>
              <InputForm
                target="password"
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
                // onClick={handleClick}
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
