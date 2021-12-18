import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TextButton from '../components/TextButton';
import Modal from '../components/Modal';

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

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    userId: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const handleSignup = () => {
    axios
      .post('http://localhost:8000/signup', {
        email: userInfo.email,
        userId: userInfo.userId,
        password: userInfo.password,
      })
      .then(() => setIsOpen(!isOpen)) // 회원가입 버튼 클릭시 모달 열기
      // .then(() => navigate('/'))
      .catch(() => {
        setErrorMessage('이미 존재하는 회원입니다');
        console.log('axios 에러');
      });
  };

  // 유효성검사 코드
  // 이메일, 아이디, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 오류메시지 상태
  const [emailMessage, setEmailMessage] = useState('');
  const [userIdMessage, setUserIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isUserId, setIsUserId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 이메일
  const onChangeEmail = useCallback(
    (e) => {
      setUserInfo({ ...userInfo, email: e.target.value });
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요!');
        setIsUserId(false);
      } else {
        setEmailMessage('올바른 이메일 형식이에요 :)');
        setIsUserId(true);
      }
    },
    [userInfo]
  );

  // 아이디
  const onChangeUserId = useCallback(
    (e) => {
      setUserInfo({ ...userInfo, userId: e.target.value });
      setUserId(e.target.value);
      if (e.target.value.length < 2 || e.target.value.length > 5) {
        setUserIdMessage('2글자 이상 6글자 미만으로 입력해주세요.');
        setIsEmail(false);
      } else {
        setUserIdMessage('올바른 이름 형식입니다 :)');
        setIsEmail(true);
      }
    },
    [userInfo]
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e) => {
      setUserInfo({ ...userInfo, password: e.target.value });
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
    },
    [userInfo]
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setUserInfo({ ...userInfo, passwordConfirmation: e.target.value });
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
    [userInfo, password]
  );

  // 모달 코드
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginContainer>
          <LoginHeader>Sign Up</LoginHeader>
          <p>모든 항목은 필수입니다.</p>
          <InputField>
            <p>E-mail</p>
            <input
              name="email"
              type="email"
              placeholder="Type user E-mail here"
              onChange={(e) => {
                onChangeEmail(e);
              }}
            />
            {email.length > 0 && <span>{emailMessage}</span>}
          </InputField>
          <InputField>
            <p>User ID</p>
            <input
              name="userId"
              type="text"
              placeholder="Type Password here"
              onChange={(e) => {
                onChangeUserId(e);
              }}
            />
            {userId.length > 0 && <span>{userIdMessage}</span>}
          </InputField>
          <InputField>
            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="Type password here"
              onChange={(e) => {
                onChangePassword(e);
              }}
            />
            {password.length > 0 && <span>{passwordMessage}</span>}
          </InputField>
          <InputField>
            <p>Password Confirmation</p>
            <input
              name="passwordConfirmation"
              type="password"
              placeholder="Type the password again"
              onChange={(e) => {
                onChangePasswordConfirm(e);
              }}
            />
            {passwordConfirmMessage.length > 0 && <span>{passwordConfirmMessage}</span>}
          </InputField>
          <br />
          <div
            type="submit"
            onClick={() =>
              !(isEmail && isUserId && isPassword && isPasswordConfirm)
                ? setErrorMessage('유효하지 않은 입력이 있어요')
                : handleSignup()
            }
          >
            <TextButton>Sign Up</TextButton>
          </div>
          {errorMessage ? <AlertBox>{errorMessage}</AlertBox> : ''}
          <br />
          <Link to="/login">
            <TextButton>Back To Log In</TextButton>
          </Link>
        </LoginContainer>
        <Modal
          isOpen={isOpen}
          openModalHandler={openModalHandler}
          noticeMessage={'회원가입이 완료되었습니다!'}
          buttonMessage={'login'}
          endPoint={'/login'}
        />
      </form>
    </>
  );
}
