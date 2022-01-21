//IoMdMoon, IoMdSunny
import { Box, Flex, IconButton, Spacer, Skeleton, propNames } from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd, IoIosSearch, IoIosSettings, IoMdSearch } from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = (props) => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <Skeleton m='2' isLoaded={!props.loading && !props.loading}>
        <Flex  >
            {isAuthenticated ?
               <>
                        <Link className='logo' to='/'>
                            <IconButton  mr='1' icon={<GiHanger />} /> </Link>
                        <Spacer />

                        <LogoutButton />
                        <Box>
                            {/* <IconButton  onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />} /> */}

                            <Link to='/favorites'>
                                <IconButton  ml='1' mr='1' icon={<IoIosHeart />} />
                            </Link>

                            <Link to='/follows' >
                                <IconButton  mr='1' icon={<IoIosSettings />} />
                            </Link>

                            <Link to='/shop'>
                                <IconButton  mr='1' icon={<IoMdSearch />} />
                            </Link>

                            <Link className='logo' to='/add'>
                                <IconButton  icon={<IoIosAdd />} />
                            </Link>
                        </Box></>
                    :
                
                    <>
                        <Link className='logo' to='/'>
                            <IconButton mr='1' icon={<GiHanger />} /> 
                            </Link>
                        <Spacer />
                        <LoginButton />
                        </>
                 }
            </Flex> 
            </Skeleton> 
    )
}


export default MenuBar;