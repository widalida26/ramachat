import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Drama from './pages/Drama';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/drama" element={<Drama />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
