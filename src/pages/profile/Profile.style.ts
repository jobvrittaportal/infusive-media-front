import styled from "styled-components";

const MyDiv = styled.div`
 
  min-height: 100vh;
  padding: 5px;
  display: flex;
  justify-content: center;
 
  .container {

    width: 100%;
  }

  .title {
    color: #002795;
    margin-bottom: 1.5rem;
  }

  .card,
  .section {
    background: #fff;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
  }

  .label {
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 4px;
    display: block;
  }
 


  .profile-container {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  }

  .cover-wrapper {
    position: relative;
    height: 160px;
    overflow: hidden;
  }

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-section {
    position: relative;
    padding: 16px 24px;
    background: #fff;
  }

  .avatar {
    position: absolute;
    top: -40px;
    left: 30px;
    border: 4px solid #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
`;

export default MyDiv;
