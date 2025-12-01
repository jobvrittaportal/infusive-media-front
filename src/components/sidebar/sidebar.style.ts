import styled from 'styled-components'

const MyDiv = styled.div`

  .sidebar_wrapper {
    background-color: #E6EEFA;
    height: 100%;
    position: fixed;
    width: 250px;
    overflow-x: hidden;
    /* Hide scrollbar by default */
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For IE and Edge */
    z-index: 1;
    display: block;
    transition: 0.5s;
    padding-bottom: 20px;
    
    /* Show scrollbar on hover */
    &:hover {
      overflow-y: auto;
      scrollbar-width: thin; /* For Firefox */
      
      /* Custom scrollbar for Chrome/Safari */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: #f0f5f1;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: #0052CC;
        border-radius: 6px;
      }
    }
    
    @media(max-width:767px) {
      display: none;
    }
    @media(min-width:768px) and (max-width:1023px) {
      display: none;
    }
  }

  .sidebar_collapse {
    background-color: #E6EEFA;
    height: 100%;
    position: fixed;
    width: 100px;
    /* Hide scrollbar by default */
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For IE and Edge */
    z-index: 1;
    display: block;
    transition: 0.5s;
    padding-bottom: 20px;
    
    /* Show scrollbar on hover */
    &:hover {
      overflow-y: auto;
      scrollbar-width: thin; /* For Firefox */
      
      /* Custom scrollbar for Chrome/Safari */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: #E6EEFA;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: #0052CC;
        border-radius: 6px;
      }
    }
  }


.collapse-button{
    position: absolute;
    right: 3px;
    top: 85px;
    z-index: 11;
    margin-left:2px;
    margin-botton:2px;
}
.collapse-button button {
    border-radius: 8px;
    height: 28px;
    min-width: 28px;
    
}
    
.top_header{
    align-items: center;
    margin-top: 20px;
}
.col{
    width:55px;
    padding: 15px 10px 0px 0px;
    mix-blend-mode: multiply;
    margin-left: 5px; 
    }

.logo1{
    width: 100%;
    mix-blend-mode: multiply;
}
.logo{
    width: 175px;
    mix-blend-mode: multiply;
    padding: 3px 10px 0px 34px;
   
}
.sidebar_box{
    padding: 0px 0px;
    margin-top: 53px;
    @media(max-width:767px){
        padding: 0px;
        margin-top: 0px;
    }
}
.sidebar_box_toggle{
    padding: 0px 0px;
    margin-top: 40px;
}
.icon_size{
    width: 24px;
    height: 24px;
    object-fit: contain;
    
}
.menu_box{
    margin-top: 24px;
    // padding: 0px 16px;
}
.menu_item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    cursor: pointer;
}
.menu_item svg{
    width: 25px;
    height: 25px;
    cursor: pointer;
}
.menu_item svg path{
    fill: #E6EEFA
}
.menu_item a{
    display: flex;
    align-items: center;
    column-gap: 12px;
    font-size: 14px;
    line-height: 24px;
    height: 30px;
    width: 100%;
    font-weight: 400;
}
.active_menu .icon_size {
  filter: brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7499%) hue-rotate(207deg) brightness(91%) contrast(101%);
}

.active_menu{
    background-color: #fff;
    transition: 0.2s;
    border-left: 4px solid #0052CC;
}
.active_menu a{
    color: #0052CC!important;
    font-weight: 500;
}

.collpase_icon{
    transform: rotate(180deg);
    transition: 0.5s;
}

.submenu_wrapper {
  padding-left: 48px;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.submenu_item {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  padding-left: 2px;
}

.active_submenu {
  font-weight: 500;
  color: #0052CC !important;
}

`
export default MyDiv
