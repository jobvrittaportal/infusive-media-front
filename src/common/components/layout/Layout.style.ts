import styled from 'styled-components';

const MyDiv = styled.div`
.parent_grid {
    display: grid;
    grid-template-columns: 250px 1fr;
    transition: 0.5s;
   

    @media (max-width: 767px) {
      display: block;
    }
  }

  .parent_grid_toggle {
    display: grid;
   
    grid-template-columns: 100px 1fr;
    transition: 0.5s;
  }

  .children_grid {
   background-color: #E6EEFA; 
    padding: 16px 0px 0px 0px;
  }

  .children_grid_toggle {
   background-color: #E6EEFA; 
    padding: 16px 0px 0px 0px;
  }

  .inner-children {
  background-color: #f2f2f2; 
  min-height: calc(100vh - 80px); 
  padding: 20px;
}

`;

export default MyDiv;
