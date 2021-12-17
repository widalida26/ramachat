import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import TextButton from './TextButton';

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 0;
  border: 2px solid ${colors.primary};
  font-size: 1rem;
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
      <TextButton
        color="primary"
        isTransparent={false}
        width="fit"
        onClick={handleSubmit}
      >
        Search
      </TextButton>
    </SearchBarContainer>
  );
}
