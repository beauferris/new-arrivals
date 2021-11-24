
import './MenuBar.css';
import { Heading, Box, IconButton } from "@chakra-ui/react"
import { IoIosHeart } from 'react-icons/io'

import { SettingsIcon } from '@chakra-ui/icons';
import {
    Link
} from "react-router-dom";

const MenuBar = () => {
    return (
        <Box className='menu-bar'>
            <Link className='logo' to='/'>
                <Heading size="m">new-arrivals</Heading></Link>
            <Box>
                <Link to='/settings/favorites'>
                    <IconButton icon={<IoIosHeart />} />
                </Link>
                <Link to='/settings/shop'>
                    <IconButton ml='1'icon={<SettingsIcon/>}/ >
                </Link>
            </Box>

        </Box>
    )
}


export default MenuBar;