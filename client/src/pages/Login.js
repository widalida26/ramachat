import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TextButton from '../components/TextButton';
import InputForm from '../components/InputForm';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';

const Main = styled.main`
  width: 100%;
  @media ${device.tablet} {
    background-color: ${colors.primaryL};
    height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  background-color: ${colors.white};
  padding: 1rem;

  @media ${device.tablet} {
    width: 400px;
    padding: 2rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const AlertBox = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.warning};
  background-color: ${colors.warningL};
  padding: 0.75rem 1.25rem;
`;

const LinkSpan = styled.span`
  font-weight: bold;
  &:hover {
    color: ${colors.secondary};
  }
`;

axios.defaults.withCredentials = true;

export default function Login({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (target) => (e) => {
    setLoginInfo({ ...loginInfo, [target]: e.target.value });
    console.log(loginInfo);
  };

  const handleLogin = () => {
    if (!loginInfo.userId || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login`, {
          userId: loginInfo.userId,
          password: loginInfo.password,
        })
        .then((data) => {
          handleResponseSuccess(data.data.data);
        })
        .catch(() => setErrorMessage('유효하지 않은 아이디와 비밀번호 입니다'));
    }
  };

  return (
    <Main>
      <LoginContainer>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Log In</h1>
          <InputForm
            target="userId"
            label="User ID"
            handleInputValue={handleInputValue}
          ></InputForm>
          <InputForm
            target="password"
            label="Password"
            type="password"
            handleInputValue={handleInputValue}
          ></InputForm>
          {errorMessage ? <AlertBox>{errorMessage}</AlertBox> : ''}
          <TextButton
            color="secondary"
            isTransparent={false}
            width="full"
            onClick={handleLogin}
          >
            Log In
          </TextButton>
          <br />
          <Link to="/signup">
            <LinkSpan>Sign up</LinkSpan>
          </Link>
        </form>
      </LoginContainer>
    </Main>
  );
}
