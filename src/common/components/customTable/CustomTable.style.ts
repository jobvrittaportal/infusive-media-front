import styled from "styled-components";

const MyDiv = styled.div`
  th, td {
    padding: 8px 12px;
    vertical-align: middle;
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    gap: 8px;
  }

  .pagination li {
    background-color: transparent;
  }

  .pagination li a {
    display: block;
    font-size: 14px;
    color: #3c3c4399;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    width: 31px;
    height: 25px;
    line-height: 26px;
    background-color: #fff;
    text-align: center;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;
  }

  .pagination li.active a {
    background-color: rgba(234, 236, 240, 1);
  }

  .pagination li.previous a,
  .pagination li.next a {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    width: auto;
    height: auto;
    border: none;
    background-color: transparent;
  }

  .pagination li.disabled a {
    color: #ccc;
    cursor: not-allowed;
    border-color: #ccc;
  }

  .icon_btn {
   min-width: 40px;
    cursor: pointer;  
  }
`;

export default MyDiv;
