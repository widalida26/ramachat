import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextButton from '../components/TextButton';
import Navbar from '../components/Navbar';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  width: 40vh;
  background-color: #dae266;
  padding: 20px;
  border-radius: 10px;
  opacity: 0.8;
  font-weight: 900;
  font-size: 1rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
  margin: 20px;
`;

const LoginHeader = styled.div`
  font-weight: 900;
  font-size: 2rem;
  margin: 10px;
`;

const AlertBox = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;

  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

axios.defaults.withCredentials = true;

function Login({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    // console.log('작동?');
    if (!loginInfo.userId || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    } else {
      axios
        .post('https://localhost:80/users/login', {
          email: loginInfo.userId,
          password: loginInfo.password,
        })
        .then(() => handleResponseSuccess())
        .catch();
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginContainer>
          <Navbar />
          <LoginHeader>Log In</LoginHeader>
          <InputField>
            <p>User ID</p>
            <input
              name="userId"
              type="text"
              placeholder="Type user ID here"
              onChange={handleInputValue('userId')}
            />
          </InputField>
          <InputField>
            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="Type Password here"
              onChange={handleInputValue('password')}
            />
          </InputField>
          <div type="submit" onClick={handleLogin}>
            <TextButton>Log In</TextButton>
          </div>
          {/* 아래 코드는 작동하지 않음 */}
          {/* <TextButton type="submit" onClick={handleLogin}>
          Log In
          </TextButton> */}
          {errorMessage ? <AlertBox>{errorMessage}</AlertBox> : ''}
          <br />
          <Link to="/signup">
            <TextButton>Sign Up</TextButton>
          </Link>
        </LoginContainer>
      </form>
    </>
  );
}

export default Login;
