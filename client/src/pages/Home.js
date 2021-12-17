import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  `;
  return (
    <Main>
      <h1>Start the chat about the series you like!</h1>
      <SearchBar />
    </Main>
  );
}
