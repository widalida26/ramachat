import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';
import Modal from './Modal';
import Reply from './Reply';
import { deleteComment, getReplies, modifyComment } from '../api/CommentsDataAPI';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import TextButton from './TextButton';

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

export default function Comment({ tokenState, drama, episode, comment, userId }) {
  // const [replies, setReplies] = useState([
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
  // ]);
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

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [hasDeleted, setHasdeleted] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(!isModelOpen);
  };

  const handleDelete = () => {
    deleteComment(tokenState, comment.id).then((result) => {
      console.log('delete response', result);
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

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const sendAPICall = async () => {
      const data = await getReplies(comment.id);
      setReplies(data);
    };
    sendAPICall();
  }, [isReplyOpen]);

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
    setReplies([...replies, newReply]);
  };

  const [content, setContent] = useState(comment.content);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isEditable, setIsEditable] = useState(false);

  const handleTextarea = (e) => {
    setEditedContent(e.target.value);
  };

  const handleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleEditRequest = () => {
    modifyComment(tokenState, comment.id, editedContent).then((result) => {
      setIsEditable(!isEditable);
      setContent(editedContent);
    });
  };
  return (
    <>
      <CommentContainer hasDeleted={hasDeleted}>
        <CommentInfoContainer>
          <p>이름없는라마</p>
          <p className="created-date">{comment.createdAt}</p>
        </CommentInfoContainer>
        {isEditable ? (
          <textarea value={editedContent} onChange={handleTextarea}></textarea>
        ) : (
          <p>{content}</p>
        )}
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
            <div>
              {isEditable ? (
                <div className="edit-comment">
                  <IconButton color="primary" onClick={handleEditable}>
                    <i class="fas fa-times"></i>
                  </IconButton>
                  <IconButton color="secondary" onClick={handleEditRequest}>
                    <i class="fas fa-check"></i>
                  </IconButton>
                </div>
              ) : null}
              {!isEditable ? (
                <div className="edit-comment">
                  <IconButton color="grey" onClick={handleEditable}>
                    <i class="far fa-edit"></i>
                  </IconButton>
                  <IconButton color="grey" onClick={openModalHandler}>
                    <i class="far fa-trash-alt"></i>
                  </IconButton>
                </div>
              ) : null}
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
          {replies
            ? replies.map((reply) => <Reply reply={reply} userId={userId} />)
            : null}
          <ReplyFormContainer>
            <CommentForm
              tokenState={tokenState}
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
