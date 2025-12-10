import styled from 'styled-components';

const MyDiv = styled.div`
 

  /* ---------------- GRID LAYOUT ---------------- */
  .parent_grid{
  display: grid;
  grid-template-columns: 237px 1fr;
  transition: 0.5s;
  background: #E6EEFA;
  @media(max-width:767px){
    display: block;
}
    
}

.parent_grid_toggle{
  display: grid;
  background-color: #E6EEFA;
  grid-template-columns: 90px 1fr;
  transition: 0.5s;
}
  

  .children_grid{
  padding: 16px 0px 0px 0px;
}
.children_grid_toggle{
  padding: 16px 0px 0px 0px;
}


  /* ---------------- CHILDREN AREA ---------------- */
  // .children_grid {
  //   background: #E6EEFA;
  //   min-height: 100vh;         /* FIX bottom blue bar */
  //   transition: 0.4s ease;
  //   padding-top: 0;
  // }

  // .children_grid_toggle {
  //   background: #E6EEFA;
  //   min-height: 100vh;         /* FIX bottom blue bar */
  //   transition: 0.4s ease;
  //   padding-top: 0;
  // }

  /* ---------------- CONTENT CONTAINER ---------------- */
  
   .inner-children{
  background: #fff;
  padding: 16px;
}
  
`;

export default MyDiv;
