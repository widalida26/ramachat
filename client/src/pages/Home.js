import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

export default function Home({ isLogin, handleLogout, nowCheck }) {
  const Main = styled.main`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;
  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} />
      <br />
      <button onClick={nowCheck}>nowStateCheck</button>
      <Main>
        <h1>Start the chat about the series you like!</h1>
        <SearchBar />
      </Main>
    </div>
  );
}
