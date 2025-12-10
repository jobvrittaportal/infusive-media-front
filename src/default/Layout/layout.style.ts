import styled from 'styled-components';

const MyDiv = styled.div`
  // background-color: #E6EEFA;
  width: 100%;
  height: 100%;

.parent_grid {
    display: grid;
    grid-template-columns: 237px 1fr;
    transition: 0.5s;
   

    @media (max-width: 767px) {
      display: block;
    }
  }

  .parent_grid_toggle {
    display: grid;
   
    grid-template-columns: 90px 1fr;
   
  }

  .parent_grid,
.parent_grid_toggle {
  display: block; /* grid not needed */
}

/* expanded layout */
.children_grid {
  margin-left: 237px;
  transition: 0.4s ease;
  background: #E6EEFA;
  min-height: 100vh;
}

/* collapsed layout */
.children_grid_toggle {
  margin-left: 90px;
  transition: 0.4s ease;
  background: #E6EEFA;
  min-height: 100vh;
}

/* content area */
.inner-children {
  background: #ffffff;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.parent_grid,
.parent_grid_toggle {
  background-color: #E6EEFA;    /* prevents white flash */
}
.children_grid,
.children_grid_toggle {
  background-color: #E6EEFA;
}

`;

export default MyDiv;
