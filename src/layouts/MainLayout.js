import { Box } from '@chakra-ui/layout';
import React from 'react';
import Navbar from './Navbar/Navbar';

function MainLayout({ children}) {
    return (
        <Box>
            <Navbar />

            {children}
        </Box>
    );
}

export default MainLayout;