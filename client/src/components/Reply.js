import styled from 'styled-components';
import { colors } from '../styles/Colors';
import IconButton from './IconButton';

const ReplyContainer = styled.article`
  width: 100%;
  padding: 1rem;
  padding-left: 2rem;
  border-top: 1px solid ${colors.grey};
  background-color: ${colors.greyL};
`;

const ReplyInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .created-date {
    color: ${colors.grey};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    gap: 0.5rem;
  }
`;

export default function Reply({ reply, userId }) {
  return (
    <ReplyContainer>
      <ReplyInfoContainer>
        <p>└ 이름없는라마</p>
        <p className="created-date">{reply.createdAt}</p>
      </ReplyInfoContainer>
      <p>{reply.content}</p>
      <ButtonContainer>
        <div>
          <IconButton color="grey">
            <i class="fas fa-heart"></i> Like {reply.likeNum}
          </IconButton>
        </div>
        {reply.userId === userId ? (
          <div className="edit-comment">
            <IconButton color="grey">
              <i class="far fa-edit"></i>
            </IconButton>
            <IconButton color="grey">
              <i class="far fa-trash-alt"></i>
            </IconButton>
          </div>
        ) : null}
      </ButtonContainer>
    </ReplyContainer>
  );
}
