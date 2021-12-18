import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  /* height: 15rem; */
  text-align: center;
  /* margin: 120px auto; */
`;

const ModalView = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  width: 300px;
  height: 140px;
  > span.close-btn {
    margin-top: 5px;
    font-size: 30px;
    cursor: pointer;
  }
  > p.desc {
    margin-top: 20px;
  }
`;

const ClickButton = styled.button`
  /* 공통 스타일 */
  /* display: inline-flex; */
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  background: #eee;
`;

function Modal({ isOpen, openModalHandler, noticeMessage, buttonMessage, endPoint }) {
  return (
    <>
      <ModalContainer>
        {isOpen ? (
          <ModalBackdrop>
            <ModalView onClick={(e) => e.stopPropagation()}>
              <span onClick={openModalHandler} className="close-btn">
                &times;
              </span>
              <p className="desc">{noticeMessage}</p>
              <Link to={endPoint}>
                <ClickButton onClick={openModalHandler}>{buttonMessage}</ClickButton>
              </Link>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
}

export default Modal;
