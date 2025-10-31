import styled from "styled-components";

const MyDiv = styled.div`
  .edit-profile-card {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 5px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    margin: 0 auto;
    overflow: hidden;
  }

  .background-section {
    position: relative;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .edit-bg-icon {
    position: absolute !important;
    top: 10px;
    right: 10px;
  }

  .form-label {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    color: #333;
  }

//   textarea,
//   input {
//     border-color: #cbd5e0;
//   }

  textarea:focus,
  input:focus {
    border-color: #0052CC;
    box-shadow: 0 0 0 1px #0052CC;
  }
`;

export default MyDiv;
