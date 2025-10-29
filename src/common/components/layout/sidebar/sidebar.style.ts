import styled from 'styled-components'

const MyDiv = styled.div`
// .sidebar_wrapper{
//     background-color: #f0f5f1;
//     height: 100%;
//     position: fixed;
//     width: 250px;
//     overflow-x: hidden;
//     scrollbar-width: thin;
//     z-index: 1;
//     display: block;
//     transition: 0.5s;
//     overflow-y: scroll;
    
//     padding-bottom: 20px;
//     @media(max-width:767px){
//         display: none;
//     }
//     @media(min-width:768px) and (max-width:1023px){
//         display: none;
//     }
// }

  .sidebar_wrapper {
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
        background-color: #006838;
        border-radius: 6px;
      }
    }
    
  //   @media(max-width:767px) {
  //     display: none;
  //   }
  //   @media(min-width:768px) and (max-width:1023px) {
  //     display: none;
  //   }
  // }
@media(max-width:1023px) {
  position: fixed;
  // width: 220px;
  z-index: 1000;
  background-color: #fff;
  
  transition: transform 0.3s ease;
}

.sidebar_wrapper.open {
  transform: translateX(0);
}

  .sidebar_collapse {
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
        background: #f0f5f1;
      }
      
      &::-webkit-scrollbar-thumb {
        background-color: #006838;
        border-radius: 6px;
      }
    }
  }



// .sidebar_collapse{
//     background-color: #f0f5f1;
//     height: 100%;
//     position: fixed;
//     width: 100px;
//     // overflow: hidden;
//     z-index: 1;
//     display: block;
//     transition: 0.5s;
//     // overflow-y: scroll;
//     padding-bottom: 20px;
// }

.collapse-button{
    position: absolute;
    right: -1px;
    top: 50px;
    z-index: 11;
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
    padding: 20px 0px 0px 5px;
    mix-blend-mode: multiply;
    margin-left: 5px; 
    }

.logo1{
    width: 100%;
    mix-blend-mode: multiply;
}
.logo{
    width: 100%;
    mix-blend-mode: multiply;
    padding: 0px 34px 0px 34px;
   
}
.sidebar_box{
    padding: 0px 0px;
    margin-top: 24px;
    @media(max-width:767px){
        padding: 0px;
        margin-top: 0px;
    }
}
.sidebar_box_toggle{
    padding: 0px 0px;
    margin-top: 44px;
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
    
  fill: #EEEEEE; 
}
}
.menu_item a{
    display: flex;
    align-items: center;
    column-gap: 12px;
    font-size: 15px;
    line-height: 24px;
    height: 30px;
    width: 100%;
    font-family: 'REM';
    font-weight: 400;
}
// .active_menu .icon_size {
//     /* Approximate CSS filter for #EEEEEE */
//     filter: invert(27%) sepia(98%) saturate(1208%) hue-rotate(81deg) brightness(95%) contrast(102%);

// }
.active_menu{
    background-color: #0052CC;
    transition: 0.2s;
    border-left: 4px solid #EEEEEE;
     color: #EEEEEE
}
.active_menu {
    color: #EEEEEE
    font-weight: 500;
}

.collpase_icon{
    transform: rotate(180deg);
    transition: 0.5s;
    height: 5px
}

.submenu_wrapper {
  padding-left: 40px;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  font-size: 15px;
  font-weight: 400;
   font-family: 'REM';
}

// .submenu_item {
//   font-size: 12px;
//   color: #000;
//   text-decoration: none;
//   font-family: 'REM';
//   font-weight: 500;
//   padding-left: 2px;
// }


.submenu_item {
  display: block;
  padding: 8px 16px;
  // border-radius: 6px;
  font-family: 'REM';
  color: #000;
  text-decoration: none;
  transition: all 0.2s ease;
}

.submenu_item:hover {
  background-color: #f5f8ff;
}

.active_submenu {
  background-color: #E6EEFA;
  font-weight: 600;
  color: #EEEEEE;
}





.active_submenu {
  font-weight: 500;
  color: #000 
}
.icon_size {
  width: 22px;
  height: 22px;
  object-fit: contain;
  color: #000000; 
}

.active_icon {
  fill: #EEEEEE; 
}


.menu_text {
  color: #000000; 
  font-size: 16px;
  font-weight: 400;
  font-family: 'REM';
}

.active_text {
  color: #EEEEEE; /* active text */
  font-weight: 500;
}

.active_menu {
  background-color: #0052CC;
  border-left: 4px solid #EEEEEE;
  transition: 0.2s;
}
// .logo {
//   width: 180px;
//   height: auto;
//   mix-blend-mode: multiply;
//   padding: 0px 24px;
//   transition: 0.3s;
// }

// .col {
//   width: 50px;
//   height: auto;
//   padding: 10px 0px 0px 10px;
//   mix-blend-mode: multiply;
//   margin-left: 5px;
//   transition: 0.3s;
// }

`
export default MyDiv
