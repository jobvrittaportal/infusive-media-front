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
.edit-icon {
    position: absolute !important;
    top: 5px;
    right: 0;
    transform: translate(25%, 25%);
    border-radius: 50% !important;
    background-color: #0052cc !important;
    color: white !important;
    transition: background-color 0.2s ease;
  }
 
  .edit-icon:hover {
    background-color: #003c99 !important;
  }
.edit-bg-icon {
    position: absolute !important;
    top: 12px; /* Chakra’s top={3} → 3 * 4px = 12px */
    right: 12px;
    background-color: #0052cc !important;
    color: white !important;
    transition: background-color 0.2s ease-in-out;
    border-radius: 8px !important; /* optional: match Chakra default */
  }
 
  .edit-bg-icon:hover {
    background-color: #003c99 !important;
  }
`;

export default MyDiv;
