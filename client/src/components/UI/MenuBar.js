//IoMdMoon, IoMdSunny
import { Box, Flex, IconButton, Spacer, Skeleton, Heading} from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd, IoIosSettings, IoMdSearch } from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const MenuBar = (props) => {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <Skeleton m={{ base: '2', md: '5' }}isLoaded={!isLoading && !props.loading}>
        <Flex  >
            {isAuthenticated ?
               <>
                        <Link className='logo' to='/'>
                           <Heading >FEED</Heading> </Link>
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
                               <Heading >FEED</Heading>
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