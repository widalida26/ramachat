import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';
import Modal from './Modal';
import { deleteComment } from '../api/CommentsDataAPI';
import { useState } from 'react';

const CommentContainer = styled.article`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${colors.primary};
  display: ${(props) => (props.hasDeleted ? 'none' : 'block')};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

const CommentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .created-date {
    color: ${colors.grey};
  }
`;

export default function Comment({ comment, userId }) {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [hasDeleted, setHasdeleted] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModelOpen);
  };

  const handleDelete = () => {
    deleteComment(comment.id).then((result) => {
      if (result.status === 200) {
        setHasdeleted(true);
        openModalHandler();
      }
    });
  };

  console.log(comment, userId);
  return (
    <CommentContainer hasDeleted={hasDeleted}>
      <CommentInfoContainer>
        <p>이름없는라마</p>
        <p className="created-date">{comment.createdAt}</p>
      </CommentInfoContainer>
      <p>{comment.content}</p>
      <ButtonContainer>
        <div>
          <IconButton color="primary">
            <i class="fas fa-heart"></i> Like {comment.likeNum}
          </IconButton>
          <IconButton color="primary">
            <i class="fas fa-comment-alt"></i> Reply {comment.replyNum}
          </IconButton>
        </div>
        {comment.userId === userId ? (
          <div className="edit-comment">
            <IconButton color="grey">
              <i class="far fa-edit"></i>
            </IconButton>
            <IconButton color="grey" onClick={openModalHandler}>
              <i class="far fa-trash-alt"></i>
            </IconButton>
          </div>
        ) : null}
      </ButtonContainer>
      <Modal
        isOpen={isModelOpen}
        openModalHandler={openModalHandler}
        modalActionlHandler={handleDelete}
        noticeMessage={'정말 삭제하시겠습니까?'}
        buttonMessage={'삭제'}
      />
    </CommentContainer>
  );
}
