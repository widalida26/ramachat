import styled from 'styled-components';
import img from '../assets/llama.jpeg';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2.25rem;
  width: 2.25rem;
  /* font-size: 1rem; */

  /* 색상 */
  background: url(${img}) no-repeat 0 0;
  background-size: 100%;

  /* 기타 */
  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

function LogoButton() {
  return <StyledButton />;
}

export default LogoButton;
