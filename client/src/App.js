import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

import Modal from './components/Modal';

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
        setIsLogin(true);
        setUserinfo(res.data.data);
        navigate('/');
      })
      .catch();
  };

  const handleResponseSuccess = () => {
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

  return (
    <>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} />
      {/* <Modal /> */}
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
