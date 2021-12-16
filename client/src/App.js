import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
