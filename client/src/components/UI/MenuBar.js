//IoMdMoon, IoMdSunny
import { Box, Flex, IconButton, Spacer} from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd,IoIosSearch} from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = () => {
    const {isAuthenticated} = useAuth0();

    return (
        <Flex m='2'
           
            className='menu-bar'>
            <Link  className='logo' to='/'>
                <IconButton mr='1' icon={<GiHanger />} /> </Link>
                <Spacer/>
            {isAuthenticated? <LogoutButton/> :    <LoginButton />}
          
            
            {isAuthenticated? 
            <Box>
                {/* <IconButton  onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />} /> */}

                <Link to='/favorites'>
                    <IconButton ml='1' mr='1' icon={<IoIosHeart />} />
                </Link>

                <Link to='/shop'>
                    <IconButton  mr='1' icon={<IoIosSearch />} />
                </Link>

                <Link to='/follows' >
                    <IconButton mr='1' icon={<SettingsIcon />} />
                </Link>

                <Link className='logo' to='/add'>
                    <IconButton  icon={<IoIosAdd />} />
                </Link>
            </Box>: " "}
        </Flex>
    )
}


export default MenuBar;