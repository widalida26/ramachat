import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { colors } from '../styles/Colors';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  p {
    font-size: 3rem;
  }

  span {
    color: ${colors.primary};
  }
`;

const SearchBarContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

export default function Home() {
  return (
    <Main>
      <p>
        드<span>라마</span> 이야기는 <span>라마챗</span>에서!
      </p>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
    </Main>
  );
}
