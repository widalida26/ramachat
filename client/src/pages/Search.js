import SearchBar from '../components/SearchBar';
import DramaListItem from '../components/DramaListItem';
import { device } from '../styles/Breakpoints';
import { getDramas } from '../api/DramaDataAPI';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  @media ${device.laptop} {
    max-width: 850px;
  }
`;

const DramaList = styled.ul`
  width: 100%;
  list-style: none;
  display: grid;
  padding: 0;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

export default function Search() {
  console.log('search comp');
  const [dramas, setDramas] = useState([]);
  const keyword = new URLSearchParams(useLocation().search).get('query');
  console.log(keyword);

  useEffect(() => {
    setDramas([]);
    const sendAPICall = async () => {
      const data = await getDramas(keyword);
      setDramas(data);
    };
    sendAPICall();
  }, [keyword]);

  return (
    <Main>
      <SearchBar />
      {dramas.length === 0 ? (
        <p>Oops! There's no matching result :(</p>
      ) : (
        <DramaList>
          {dramas.map((drama) => (
            <DramaListItem
              id={drama.id}
              name={drama.name}
              poster_path={drama.poster_path}
              key={drama.id}
            />
          ))}
        </DramaList>
      )}
    </Main>
  );
}

// dramas : testing data
/*
  const dramas = [
    {
      name: 'Sherlock',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg',
    },
    {
      name: 'Sherlock Holmes',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/beVL3rvvATNQLVVnWrWa3rXXWd3.jpg',
    },
    {
      name: 'Sherlock Holmes',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/zDEed6lENay31oQlDKW4gCjT6JT.jpg',
    },
    {
      name: 'Sherlock Holmes',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/eFORQaQuldP89f8mQMaa71mmLqu.jpg',
    },
    {
      name: 'The Rivals of Sherlock Holmes',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/3sfRBSpBT6k5mEANa53T6hFg5lk.jpg',
    },
    {
      name: 'Sherlock Holmes and Dr. Watson',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/WSnxS8TeUyMZwnkbtJ4XCvQy3D.jpg',
    },
    {
      name: 'Sherlock Holmes in the 22nd Century',
      poster_path: 'https://www.themoviedb.org/t/p/w1280/mwLwPQBOeS1ukxUMTh7Sq1aNM63.jpg',
    },
  ];
  */
