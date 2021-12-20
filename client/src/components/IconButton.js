import styled from 'styled-components';
import { colors } from '../styles/Colors';

const StyledButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;

  /* 크기 */
  font-size: 1rem;

  /* 색상 */
  color: ${(props) => colors[props.color]};

  &:hover {
    opacity: 0.75;
  }
`;

function IconButton({ children, color, onClick }) {
  return (
    <>
      <StyledButton color={color} onClick={onClick}>
        {children}
      </StyledButton>
    </>
  );
}

export default IconButton;
