import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = () => {
    axios
      .get('https://localhost:80/users/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
        setUserinfo(res.data);
        navigate('/');
      })
      .catch();
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post('https://localhost:80/users/logout').then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      navigate('/');
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  // ! 마운트 될 때만 => [] vs 렌더링 될때마다 => []삭제

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navbar isLogin={isLogin} handleLogout={handleLogout} />}
        />
        <Route
          exact
          path="/login"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
