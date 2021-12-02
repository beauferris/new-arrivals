
import './MenuBar.css';
import { Heading, Box, IconButton, Button, useColorMode } from "@chakra-ui/react"
import { IoIosHeart,IoMdMoon, IoMdSunny } from 'react-icons/io'
import { GiHanger} from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import {
    Link
} from "react-router-dom";

const MenuBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box className='menu-bar'>
            <Link className='logo' to='/'>
                <IconButton icon={<GiHanger/>}/> </Link>
            <Box>
                {/* <IconButton mr='1' onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />} /> */}
                <Link to='/settings/favorites'>
                    <IconButton icon={<IoIosHeart />} />
                </Link>
                <Link to='/settings/shop'>
                    <IconButton ml='1' icon={<SettingsIcon />} />
                </Link>
            </Box>

        </Box>
    )
}


export default MenuBar;