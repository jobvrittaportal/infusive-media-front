// src/modules/User/user.style.ts
import styled from "styled-components";

const UserDiv = styled.div`
  padding: 20px;
  background-color: #fff;

  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .search-box input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 250px;
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

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f5f5f5;
    color: #333;
  }

  tr:hover {
    background-color: #f9f9f9;
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
`;

export default UserDiv;
