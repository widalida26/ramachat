import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

function Login({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    user_id: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (target) => (e) => {
    setLoginInfo({ ...loginInfo, [target]: e.target.value });
    console.log(loginInfo);
  };

  const handleLogin = () => {
    console.log('작동?');
    if (!loginInfo.user_id || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    } else {
      axios
        .post('http://localhost:8000/users/login', {
          user_id: loginInfo.user_id,
          password: loginInfo.password,
        })
        // .then(() => handleResponseSuccess())
        .then()
        .catch();
    }
  };

  return (
    <Main>
      <LoginContainer>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Log In</h1>
          <InputForm
            target="user_id"
            label="User ID"
            handleInputValue={handleInputValue}
          ></InputForm>
          <InputForm
            target="password"
            label="Password"
            handleInputValue={handleInputValue}
          ></InputForm>
          {/* <div type="submit" onClick={handleLogin}> */}
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

export default Login;
