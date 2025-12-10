import styled from "styled-components";

const MyDiv = styled.div`

/* =======================================
   1. SIDEBAR MAIN WRAPPERS 
======================================= */
.sidebar_wrapper {
  background-color: #E6EEFA;
  height: 100%;
  width: 237px;
  position: fixed;
  z-index: 1;
  display: block;
  overflow-x: hidden;
  transition: 0.5s;
  padding-bottom: 20px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &:hover {
    overflow-y: auto;
    scrollbar-width: thin;

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

  @media(max-width:767px),
         (min-width:768px) and (max-width:1023px) {
    display: none;
  }
}

.sidebar_collapse {
  background-color: #E6EEFA;
  height: 100%;
  width: 90px;
  position: fixed;
  z-index: 1;
  display: block;
  transition: 0.5s;
  padding-bottom: 20px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &:hover {
    overflow-y: auto;
    scrollbar-width: thin;

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

/* =======================================
   2. COLLAPSE BUTTON 
======================================= */
.collapse-button {
  position: absolute;
  top: 30px;
  right: -1px;
  z-index: 11;
  margin-left: 2px;
  margin-bottom: 3px;

  button {
    border-radius: 8px;
    height: 28px;
    min-width: 28px;
  }
}

// .collpase_icon {
//   transform: rotate(0deg);
//   transition: 0.5s;
// }
 /* When sidebar is expanded */
.sidebar_wrapper .collapse-button button img {
  transform: rotate(0deg);   /* show < */
  transition: 0.3s;
}
 
/* When sidebar is collapsed */
.sidebar_collapse .collapse-button button img {
  transform: rotate(180deg);     /* show > */
  transition: 0.3s;
}
/* =======================================
   3. LOGO AREA
======================================= */
.logo_wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 22px 0 22px;
}

.logo_icon {
  width: 40px;
  height: auto;
}

.logo_text {
  height: 40px;
  object-fit: contain;
  margin-top: 3px;
}

.sidebar_collapse .logo_wrapper {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

/* =======================================
   4. SIDEBAR BOXES
======================================= */
.sidebar_box {
  margin-top: 53px;
  padding: 0;

  @media(max-width:767px) {
    margin-top: 0;
    padding: 0;
  }
}

.sidebar_box_toggle {
  margin-top: 40px;
  padding: 0;
}

/* =======================================
   5. MENU ITEMS
======================================= */
.menu_box {
  margin-top: 24px;
}

.menu_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    column-gap: 12px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
  }

  svg {
    width: 25px;
    height: 25px;

    path {
      fill: #E6EEFA;
    }
  }
}

.icon_size {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* =======================================
   6. ACTIVE MENU HIGHLIGHT
======================================= */
.active_menu {
  background-color: #fff;
  border-left: 4px solid #0052CC;
  transition: 0.2s;

  a {
    color: #0052CC !important;
    font-weight: 500;
  }

  .icon_size {
    filter: brightness(0) saturate(100%) invert(27%) sepia(100%) 
            saturate(7499%) hue-rotate(207deg) brightness(91%) contrast(101%);
  }
}

/* =======================================
   7. SUBMENU
======================================= */
.submenu_wrapper {
 
  margin-left: -50px;
  margin-top: 10px;       /* 🔥 make spacing constant */
  margin-bottom: 10px;    /* 🔥 add consistent bottom spacing */
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.submenu_item {
  padding-left: 2px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  color: #000;
  text-decoration: none;
}

.active_submenu {
  color: #0052CC !important;
  font-weight: 500;
}

`;

export default MyDiv;
