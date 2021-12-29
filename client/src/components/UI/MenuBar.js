//IoMdMoon, IoMdSunny
import './MenuBar.css';
import { Box, IconButton} from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd} from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

const MenuBar = () => {
    return (
        <Box
            bgColor="rgb(249, 249, 249,0.85)"
            className='menu-bar'>
            <Link className='logo' to='/'>
                <IconButton icon={<GiHanger />} /> </Link>
            <Box >
                {/* <IconButton  onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />} /> */}

                <Link to='/favorites'>
                    <IconButton mr='1' icon={<IoIosHeart />} />
                </Link>

                <Link className='logo' to='/add'>
                    <IconButton mr='1' icon={<IoIosAdd />} />
                </Link>

                <Link to='/shop'>
                    <IconButton icon={<SettingsIcon />} />
                </Link>
            </Box>
        </Box>
    )
}


export default MenuBar;