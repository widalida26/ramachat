import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Drama from './pages/Drama';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Comments from './pages/Comments';
import MyPagePersonal from './pages/MyPagePersonal';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [tokenState, setTokenState] = useState(null);

  const navigate = useNavigate();

  const isAuthenticated = (data) => {
    axios
      // .get(`${process.env.REACT_APP_SERVER_URL}/auth`, {
      .get(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: tokenState,
        },
        withCredentials: true,
      })

      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data.data.userInfo);
        // navigate('/');
      })
      .catch();
  };

  const handleResponseSuccess = (data) => {
    console.log(data);
    setTokenState(data);
    isAuthenticated();
  };

  const handleLogout = () => {
    // axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`).then((res) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/logout`, {
        headers: {
          'Content-Type': `application/json`,
          authorization: tokenState,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
        setTokenState(null);
        // navigate('/');
      });
  };

  const checkButton = () => {
    console.log(tokenState);
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <button onClick={checkButton}>checktokenstate</button>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} />
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage/personal-information" element={<MyPagePersonal />} />
        <Route path="/drama/:id" element={<Drama />} />
        <Route
          path="/drama/:id/comments/season/:season/episode/:episode"
          element={<Comments userInfo={userInfo} />}
        />
      </Routes>
    </>
  );
}

export default App;
