//IoMdMoon, IoMdSunny
import { Box, Flex, IconButton, Spacer, Skeleton, propNames } from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd, IoIosSearch } from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { SettingsIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = (props) => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <>

            {isAuthenticated ?
                <Flex m='2'>

                    <Skeleton isLoaded={!props.loading && !props.loading}>
                        <Link className='logo' to='/'>
                            <IconButton mr='1' icon={<GiHanger />} /> </Link></Skeleton>
                    <Spacer />

                    <Skeleton isLoaded={!props.loading && !props.loading}>
                        <LogoutButton />
                    </Skeleton>

                
                    <Box>
                        {/* <IconButton  onClick={toggleColorMode}
                    icon={colorMode === "light" ? <IoMdMoon /> : <IoMdSunny />} /> */}

                        
                        <Link to='/favorites'>
                            <IconButton ml='1' mr='1' icon={<IoIosHeart />} />
                        </Link>

                        <Link to='/shop'>
                            <IconButton mr='1' icon={<IoIosSearch />} />
                        </Link>

                        <Link to='/follows' >
                            <IconButton mr='1' icon={<SettingsIcon />} />
                        </Link>

                        <Link className='logo' to='/add'>
                            <IconButton icon={<IoIosAdd />} />
                        </Link>
                    </Box>
                </Flex> :

                <Flex m='2'>
                    <Skeleton isLoaded={!isLoading && !props.loading}><Link className='logo' to='/'>
                        <IconButton mr='1' icon={<GiHanger />} /> </Link></Skeleton>
                    <Spacer />

                    <Skeleton isLoaded={!isLoading && !props.loading}>
                        <LoginButton /> </Skeleton>
                </Flex>
            }
        </>
    )
}


export default MenuBar;