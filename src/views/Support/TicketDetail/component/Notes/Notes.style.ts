import styled from "styled-components";

const MyDiv = styled.div`
  width: 100%;
  padding: 20px;

  .notes-box {
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 25px;
    position: relative;
  }

  .submit-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .activities-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .activity-card {
    border-left: 4px solid #1565d8;
    padding: 12px 16px;
    background: #f7fafc;
    border-radius: 6px;
  }

  .activity-header {
    font-weight: bold;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .user-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .activity-time {
    font-size: 12px;
    color: gray;
  }
`;

export default MyDiv;
