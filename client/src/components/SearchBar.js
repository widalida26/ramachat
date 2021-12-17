import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;

  @media ${device.tablet} {
    width: 400px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 0;
  border: 2px solid ${colors.primary};
`;

const SearchButton = styled.button`
  height: 40px;
  padding: 10px;
  margin: 0;
  border-radius: 0;
  border: none;
  background-color: ${colors.primary};
  color: white;
  cursor: pointer;
`;

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?query=${keyword}`);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search the series"
        onKeyUp={handleInputChange}
      ></SearchInput>
      <SearchButton type="submit" onClick={handleSubmit}>
        Search
      </SearchButton>
    </SearchBarContainer>
  );
}
