//IoMdMoon, IoMdSunny
import './MenuBar.css';
import { Box, Flex, IconButton, Spacer} from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd} from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = () => {
    const {isAuthenticated} = useAuth0();

    return (
        <Flex  m='1'
            bgColor="rgb(249, 249, 249,0.85)"
            className='menu-bar'>
            <Link  className='logo' to='/'>
                <IconButton mr='1' icon={<GiHanger />} /> </Link>
            {isAuthenticated? <LogoutButton/> :    <LoginButton/>}
          
            <Spacer/>
            <Box>
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
        </Flex>
    )
}


export default MenuBar;