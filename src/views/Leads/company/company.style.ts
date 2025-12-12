import styled from 'styled-components';
 
const MyDiv = styled.div`
  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
 
  .search-box input {
    padding: 8px 12px;
    border: 1px solid #0051CA;
    border-radius: 6px;
    width: 250px;
 
  }
 

.btn {
    background: #3d8be4ff;
    color:white;
    &:hover{
    background: #4A90E2;
    color:white;
  }
}
  
  .add-btn {
    background-color: #1565d8;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  }
 
  .add-btn:hover {
    background-color: #0d47a1;
  }
 
 
 
  .form-container {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
 
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
 
  .form-input {
    display: flex;
    flex-direction: column;
  }
 
  .form-input label {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 6px;
  }
 
  .form-input input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
 
  .form-input input:focus {
    outline: none;
    border-color: #1565d8;
  }
 
  .submit-btn {
    background-color: #1565d8;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
  }
 
  .submit-btn:hover {
    background-color: #0d47a1;
  }
.card_box {
  background: white;
  padding: 15px 10px;
  border-radius: 16px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
 
`;
 
 
export default MyDiv;