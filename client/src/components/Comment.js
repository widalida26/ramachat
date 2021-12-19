import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';

const CommentContainer = styled.article`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid ${colors.primary};
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

export default function Comment({ comment }) {
  return (
    <CommentContainer>
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
        <div>
          <IconButton color="grey">
            <i class="far fa-edit"></i>
          </IconButton>
          <IconButton color="grey">
            <i class="far fa-trash-alt"></i>
          </IconButton>
        </div>
      </ButtonContainer>
    </CommentContainer>
  );
}
