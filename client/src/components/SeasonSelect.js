import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { useState } from 'react';

export default function SeasonSelect({ seasons = [], setSeasonNumber }) {
  // const [value, setValue] = useState(0);

  const handleChange = (event) => {
    // setValue(event.target.value);
    setSeasonNumber(event.target.value);
  };
  return (
    <>
      <select onChange={handleChange}>
        {seasons.map((season) => (
          <option value={season.season_number}>{season.name}</option>
        ))}
      </select>
    </>
  );
}
