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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = () => {
    axios
      .get('http://localhost:8000/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data.data);
        navigate('/');
      })
      .catch();
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  const handleLogout = () => {
    axios.post('http://localhost:8000/logout').then((res) => {
      setUserInfo(null);
      setIsLogin(false);
      // navigate('/');
    });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
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
        <Route path="/drama" element={<Drama />} />
      </Routes>
    </>
  );
}

export default App;
