import styled from 'styled-components';
import img from '../assets/llama-logo.png';
import { colors } from '../styles/Colors';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;

  /* 크기 */
  font-size: 1.5rem;

  /* 색상 */
  color: ${colors.white};

  img {
    height: 2rem;
    margin-right: 0.5rem;
  }

  &:hover {
    opacity: 0.75;
  }
`;

function LogoButton() {
  // return <StyledButton>{/* <img src={img} /> */}Ramachat</StyledButton>;
  return (
    <StyledButton>
      <img src={img} />
      <span>RamaChat</span>
    </StyledButton>
  );
}

export default LogoButton;
