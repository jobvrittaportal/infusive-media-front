/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Flex, Grid, GridItem, Box } from '@chakra-ui/react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import MyDiv from './Layout.style';
import { useNavigate } from 'react-router';


const AppLayout = (props: any) => {
    const [isActive, setIsActive] = useState(() => {
        return sessionStorage.getItem('activePortal') || 'hrlense';
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
            <Grid className={toggleSidebar ? 'parent_grid_toggle' : 'parent_grid'}>
                <GridItem className="sidebar_grid">
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
