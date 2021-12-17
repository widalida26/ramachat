import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = () => {
    axios
      .get('http://localhost:8000/auth', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setIsLogin(true);
        setUserinfo(res.data.data);
        navigate('/');
        console.log('로그인 성공');
      })
      .catch();
  };
  const handleResponseSuccess = (data) => {
    // ! 넘긴 데이터 수정
    console.log('post 넘겨받은 데이터', data);

    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post('http://localhost:8000/logout').then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      navigate('/');
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  // ! 마운트 될 때만 => [] vs 렌더링 될때마다 => []삭제

  const nowCheck = () => {
    console.log(userinfo);
    console.log(isLogin);
  };

  return (
    <>
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/"
          element={
            <Home isLogin={isLogin} handleLogout={handleLogout} nowCheck={nowCheck} />
          }
        />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
