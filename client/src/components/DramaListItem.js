import styled from 'styled-components';

export default function DramaListItem({ name, poster }) {
  const Item = styled.li`
    list-style: none;
    .poster {
      width: 100%;
      height: 0;
      padding-bottom: 150%;
      background-color: lightgrey;
      background-image: url(${(props) => props.poster});
      background-size: cover;
      background-position: center center;
    }
  `;

  return (
    <Item poster={poster}>
      {/* <img src={poster}></img> */}
      <div className="poster"></div>
      <h3>{name}</h3>
    </Item>
  );
}
