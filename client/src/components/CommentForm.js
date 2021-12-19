import styled from 'styled-components';
import TextButton from './TextButton';
import { colors } from '../styles/Colors';
import { device } from '../styles/Breakpoints';
import { postComment } from '../api/CommentsDataAPI';
import { useImperativeHandle, useState } from 'react';
import Modal from './Modal';
import { useSearchParams } from 'react-router-dom';

const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem;
`;

const FormContainer = styled.div`
  background-color: ${colors.white};
  border-top: 1px solid ${colors.primary};
  padding: 0.5em;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  @media ${device.tablet} {
    position: relative;
    border: 1px solid ${colors.primary};
  }
`;

export default function CommentForm({
  userId,
  dramaId,
  dramaName,
  seasonIndex,
  episodeIndex,
  episodeId,
  commentNum,
}) {
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (e) => {
    setContent(e.target.value);
    console.log(content);
  };
  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!userId) {
      console.log('LOG IN REQUIRED!!!');
      setIsModalOpen(true);
    } else {
      postComment(
        userId,
        content,
        dramaId,
        dramaName,
        seasonIndex,
        episodeIndex,
        episodeId,
        commentNum
      ).then((result) => {
        console.log(result);
      });
    }
  };

  return (
    <FormContainer>
      <form>
        <Input
          type="text"
          placeholder="메시지를 입력하세요"
          value={content}
          onChange={handleChange}
        ></Input>
        <TextButton
          color="primary"
          isTransparent={false}
          width="fit"
          onClick={handleClick}
        >
          Send
        </TextButton>
      </form>
      <Modal
        isOpen={isModalOpen}
        noticeMessage={'login required'}
        buttonMessage={'login'}
        endPoint={'/login'}
        openModalHandler={openModalHandler}
      />
    </FormContainer>
  );
}
