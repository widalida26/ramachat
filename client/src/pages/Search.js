import SearchBar from '../components/SearchBar';
import DramaListItem from '../components/DramaListItem';
import { device } from '../styles/Breakpoints';
import styled from 'styled-components';

export default function Search({ dramas, setSearchResult }) {
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

  const DramaList = styled.ul`
    list-style: none;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media ${device.tablet} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${device.laptop} {
      grid-template-columns: repeat(6, 1fr);
    }
  `;
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <SearchBar setSearchResult={setSearchResult} />
        <DramaList>
          {dramas.map((drama) => (
            <DramaListItem
              name={drama.name}
              poster={'https://www.themoviedb.org/t/p/w1280' + drama.poster_path}
              key={drama.name}
            />
          ))}
        </DramaList>
        {/* <p>Oops!\nThere's no matching result :(</p> */}
      </main>
    </div>
  );
}
