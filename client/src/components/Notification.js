import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';
import { useState } from 'react';

// 클릭시 색 바꾸기 (checked, unchecked) => 탭바에도 적용
// delete 아이콘 넣기

const Main = styled.article`
  width: 100%;
  padding: 1rem;
  display: block;
  /* border: 1px solid ${colors.black}; */
`;

const NotificationContainer = styled.div`
  display: flex;
  height: 20%;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.black};
  display: ${(props) => (props.isDeleted ? 'none' : 'flex')};
  background-color: ${(props) => (props.isChecked ? `${colors.primaryL}` : 'white')};
  margin-bottom: 5px;

  div {
    display: flex;
    gap: 0.5rem;
  }

  p {
    padding-left: 10px;
  }
`;

export default function Notification({ content }) {
  // 삭제 기능
  const [isDeleted, setIsDeleted] = useState(false);
  const handleDelete = () => {
    setIsDeleted(true);
  };

  // 체크 기능
  const [isChecked, setIsChecked] = useState(0);
  const handleCheck = () => {
    setIsChecked(1);
  };

  console.log(isChecked);

  return (
    <>
      <Main>
        {isChecked === 0 ? (
          <NotificationContainer isDeleted={isDeleted} isChecked={isChecked}>
            <p>"{content}" 댓글에 답변이 달렸습니다.</p>
            <div>
              <IconButton color="grey" onClick={handleCheck}>
                <i class="far fa-check-square"></i>
              </IconButton>
              <IconButton color="grey" onClick={handleDelete}>
                <i class="far fa-trash-alt"></i>
              </IconButton>
            </div>
          </NotificationContainer>
        ) : (
          ''
        )}
      </Main>
    </>
  );
}
