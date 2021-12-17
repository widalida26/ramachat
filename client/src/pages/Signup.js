import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextButton from '../components/TextButton';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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

function Signup() {
  const [userinfo, setuserinfo] = useState({
    email: '',
    userId: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    if (
      !userinfo.email ||
      !userinfo.userId ||
      !userinfo.password ||
      !userinfo.passwordConfirmation
    ) {
      setErrorMessage('모든 항목은 필수입니다');
    } else {
      // console.log('설마');
      axios
        .post('https://localhost:80/users/signup', {
          email: userinfo.email,
          password: userinfo.userId,
          username: userinfo.password,
          mobile: userinfo.passwordConfirmation,
        })
        .then(() => navigate('/'))
        .catch();
    }
  };

  // ! 유효성검사 코드
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 이름
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다 :)');
      setIsName(true);
    }
  }, []);

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요!');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요 :)');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요 :)');
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 :)');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요!');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginContainer>
          <Navbar />
          <LoginHeader>Sign Up</LoginHeader>
          <p>모든 항목은 필수입니다.</p>
          <InputField>
            <p>E-mail</p>
            <input
              name="email"
              type="email"
              placeholder="Type user E-mail here"
              onChange={handleInputValue('email')}
            />
          </InputField>
          <InputField>
            <p>User ID</p>
            <input
              name="userId"
              type="text"
              placeholder="Type Password here"
              onChange={handleInputValue('userId')}
            />
          </InputField>
          <InputField>
            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="Type password here"
              onChange={handleInputValue('password')}
            />
            {name.length > 0 && <span>{nameMessage}</span>}
          </InputField>
          <InputField>
            <p>Password Confirmation</p>
            <input
              name="passwordConfirmation"
              type="password"
              placeholder="Type the password again"
              onChange={handleInputValue('passwordConfirmation')}
            />
          </InputField>
          <br />
          <div type="submit" onClick={handleSignup}>
            <TextButton>Sign Up</TextButton>
          </div>
          {errorMessage ? <AlertBox>{errorMessage}</AlertBox> : ''}
          <br />
          <Link to="/login">
            <TextButton>Back To Log In</TextButton>
          </Link>
        </LoginContainer>
      </form>
    </>
  );
}

export default Signup;
