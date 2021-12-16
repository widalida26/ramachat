import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home setSearchResult={setSearchResult} />} />
          <Route
            path="/search"
            element={<Search setSearchResult={setSearchResult} dramas={searchResult} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
