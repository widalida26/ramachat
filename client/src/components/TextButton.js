import styled from 'styled-components';

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  background: #eee;

  /* 기타 */
  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

function TextButton({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

export default TextButton;
