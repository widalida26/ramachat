import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

export default function Home() {
  return (
    <Main>
      <h1>Start the chat about the series you like!</h1>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
    </Main>
  );
}
