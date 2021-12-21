import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';
import Modal from './Modal';
import Reply from './Reply';
import { deleteComment } from '../api/CommentsDataAPI';
import { useState } from 'react';
import CommentForm from './CommentForm';

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

const ReplyFormContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${colors.grey};
  background-color: ${colors.greyL};
`;

export default function Comment({ drama, episode, comment, userId }) {
  const [replies, setReplies] = useState([
    {
      id: 125,
      episodeId: 1020,
      userId: 16,
      content:
        'I’ve been looking forward to the new season for such a long time! Finally,Sherlock and Watson are back!',
      likeNum: 10,
      parentCommentId: 123,
      createdAt: '2021-12-15',
      modifiedAt: '2021-12-15',
    },
    {
      id: 126,
      episodeId: 1020,
      userId: 3,
      content: 'It was bit disappointing.',
      likeNum: 2,
      parentCommentId: 123,
      createdAt: '2021-12-14',
      modifiedAt: '2021-12-15',
    },
  ]);
  // dummy data
  // [
  //   {
  //     id: 125,
  //     episodeId: 1020,
  //     userId: 16,
  //     content:
  //       'I’ve been looking forward to the new season for such a long time! Finally,Sherlock and Watson are back!',
  //     likeNum: 10,
  //     parentCommentId: 123,
  //     createdAt: '2021-12-15',
  //     modifiedAt: '2021-12-15',
  //   },
  //   {
  //     id: 126,
  //     episodeId: 1020,
  //     userId: 3,
  //     content: 'It was bit disappointing.',
  //     likeNum: 2,
  //     parentCommentId: 123,
  //     createdAt: '2021-12-14',
  //     modifiedAt: '2021-12-15',
  //   },
  // ]

  const addNewReply = (content, createdAt, episodeId, id, userId, parentCommentId) => {
    const newReply = {
      content,
      createdAt,
      episodeId,
      id,
      likeNum: 0,
      parentCommentId,
      updatedAt: createdAt,
      userId,
    };
    setReplies([newReply, ...replies]);
  };

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

  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const openReplyHandler = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  console.log(comment, userId);
  return (
    <>
      <CommentContainer hasDeleted={hasDeleted}>
        <CommentInfoContainer>
          <p>이름없는라마</p>
          <p className="created-date">{comment.createdAt}</p>
        </CommentInfoContainer>
        <p>{comment.content}</p>
        <ButtonContainer>
          <div>
            <IconButton color="grey">
              <i class="fas fa-heart"></i> Like {comment.likeNum}
            </IconButton>
            <IconButton color="grey" onClick={openReplyHandler}>
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
      {isReplyOpen ? (
        <div>
          {replies.map((reply) => (
            <Reply reply={reply} userId={userId} />
          ))}
          <ReplyFormContainer>
            <CommentForm
              userId={userId}
              dramaId={drama.id}
              dramaName={drama.name}
              seasonIndex={episode.season_number}
              episodeIndex={episode.episode_number}
              episodeId={episode.id}
              addNewComment={addNewReply}
              parentCommentId={comment.id}
            />
          </ReplyFormContainer>
        </div>
      ) : null}
    </>
  );
}
