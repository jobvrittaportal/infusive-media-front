import styled from 'styled-components';

const MyDiv = styled.div`
.login-container {
  max-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
 .login-logo {
    width: 120px;
    margin-bottom: 30px;
    background-color: #ffffff;
  }
 .login-image {
    width: 100%;
    height: 100vh;
    object-fit: cover; 
    overflow: hidden;
  }
.logo-wrapper {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  width:119px;
}

.logo-image {
  width: 40px;
  height: 40px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1a237e;
}

.logo-highlight {
  color: #1565d8;
}

.welcome-section {
  margin-bottom: 32px;
 
}

.welcome-title {
  font-size: 28px;
  font-weight: 600;
  color: #000;
}

.welcome-subtitle {
  color: #666;
}

.form-container {
  width: 100%;
  max-width: 360px;
}

.form-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.form-group {
  margin-top: 20px;
}
.input {
  padding: 10px;
  border-radius: 6px;
  width:350px;
}

.input-field:focus {
  border-color: #1565d8;
  box-shadow: 0 0 0 1px #1565d8;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  color: #6c63ff;
  font-size: 13px;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-btn {
  background-color: #1565d8 !important;
  color: #fff !important;
  border-radius: 9999px;
  width: 100%;
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 8px;
}

.login-btn:hover {
  background-color: #0d47a1 !important;
}
.grid_container{
  grid-template-columns: repeat(12, 1fr);
}
.otp{
 font-family:"Poppins";
 font-size: 12px;
 font-weight: 500;
}
.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
  .login-card {
    width: 420px;
    background: #fff;
    padding: 20px 42px;
    border-radius: 16px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    text-align: center;
  }

.logo-wrapper {
  display: flex;
  justify-content: center;  
  align-items: center;
  width: 100%;
}
`;

export default MyDiv;
