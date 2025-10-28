import styled from 'styled-components';

const MyDiv = styled.div`

.profile_menu{
  border: 1px solid #EEF3FB;
  padding: 1px 5px;
  width: 50px;
  border-radius: 8px;
}
.profile_menu button {
    background: transparent;
    padding: 0;
}
.profile_menu button:hover{
    background: transparent;
}
.dropdown_list{
    padding: 0;
    border: 0;
    box-shadow: 0px 1px 15px #D0D5DD;
    width: 100%;
    border-radius: 8px;
}
.logout_user{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.divider{
    border-color: #EAECF0;
    opacity: 1;
}
.profile_menu button .chakra-button__icon .chakra-avatar {
    width: 32px;
    height: 32px;
    background: rgb(17, 17, 17);
}
.profile_menu button .chakra-button__icon .chakra-avatar div {
    font-size: 16px;
    color: rgb(255, 255, 255);
    font-weight: 400;
    font-family: Poppins, sans-serif;
}
.heading{
  color: #000;
  font-size: 14px;
  font-weight: 600;
  }
`;

export default MyDiv;
