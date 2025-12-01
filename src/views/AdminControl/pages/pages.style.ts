import styled from 'styled-components';
const MyDiv = styled.div`
  .page_heading {
    margin-bottom: 24px;
  }
  .btn {
    background: rgba(30, 101, 241, 1);
    color: white;
    &:hover {
      background: rgba(30, 101, 241, 1);
      color: white;
    }
  }
  .flex_header {
    align-items: center;
    justify-content: space-between;
  }
  table {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  .edit:hover{
   text-decoration: underline
   }  
   .del{
      background: #FF00001A;
      color: #FF0000;
    &:hover {
      background: #FF00001A;
      color: #FF0000;
    }
   }
`;
export default MyDiv;
