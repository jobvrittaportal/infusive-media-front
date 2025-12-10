import{ useEffect, useState } from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/react'
import { Navbar, Sidebar } from '../../components'
import MyDiv from './layout.style'
import { useNavigate } from 'react-router'


const AppLayout = (props: any) => {
  const [isActive, setIsActive] = useState(() => {
    return sessionStorage.getItem('activePortal') || 'infusive-media';
  });

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const handleSidePanel = () => {
    setToggleSidebar(!toggleSidebar)
  }

  useEffect(() => {
    sessionStorage.setItem('activePortal', isActive);
  }, [isActive]);

  return (
    <MyDiv>
      <Grid  gap={0} className={toggleSidebar ? 'parent_grid_toggle' : 'parent_grid'}>

        <GridItem >
          <Sidebar toggleSidebar={toggleSidebar} handleSidePanel={handleSidePanel} activePortal={isActive} />
        </GridItem>

        <GridItem className={toggleSidebar ? 'children_grid_toggle' : 'children_grid'}>
          <Navbar />
          <Box mt={4} className='inner-children'>
            {props.children}
          </Box>
        </GridItem>

      </Grid>
    </MyDiv>

  )
}

export default AppLayout
