import { getDrama } from '../api/DramaDataAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ setSearchResult }) {
  const [keyword, setKeyword] = useState('');
  let navigate = useNavigate();
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await getDrama(keyword);
    setSearchResult(data);
    navigate(`/search?query=${keyword}`);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search the series"
          onChange={handleInputChange}
        ></input>
        <button type="button" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </div>
  );
}
