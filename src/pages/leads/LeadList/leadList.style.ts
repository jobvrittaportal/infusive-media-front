import styled from 'styled-components';

const MyDiv = styled.div`
.stats-grid{
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn {
    background: rgb(0,82,204);
    color: white;
    &:hover {
      background: rgb(0,82,204);
      color: white;
    }
  }
`;

export default MyDiv;
