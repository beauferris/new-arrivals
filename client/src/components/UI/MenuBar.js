//IoMdMoon, IoMdSunny
import { Box, Flex, IconButton, Spacer, Skeleton, Heading, useDisclosure } from "@chakra-ui/react"
import { IoIosHeart, IoIosAdd, IoIosSettings, IoMdSearch } from 'react-icons/io'
import { GiHanger } from 'react-icons/gi'
import { Link } from "react-router-dom";
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import {
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,

    ModalBody,
    ModalCloseButton,

} from "@chakra-ui/react"

const MenuBar = (props) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login to customize feed and favourites</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginButton />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Skeleton m='2' isLoaded={!isLoading && !props.loading}>
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



                                <Link to='/shop'>
                                    <IconButton ml='1' icon={<IoMdSearch />} />
                                </Link>

                                <Link to='/favorites'>
                                    <IconButton ml='1' mr='1' icon={<IoIosHeart />} />
                                </Link>

                                <Link to='/follows' >
                                    <IconButton mr='1' icon={<IoIosSettings />} />
                                </Link>

                                <Link className='logo' to='/add'>
                                    <IconButton icon={<IoIosAdd />} />
                                </Link>
                            </Box></>
                        :

                        <>
                            <Link className='logo' to='/'>
                                <Heading >FEED</Heading>
                            </Link>

                            <Spacer />
                            <LoginButton />

                            <Link to='/shop'>
                                <IconButton ml='1' icon={<IoMdSearch />} />
                            </Link>

                            <IconButton onClick={onOpen} ml='1' mr='1' icon={<IoIosHeart />} />
                            <IconButton onClick={onOpen} mr='1' icon={<IoIosSettings />} />

                        </>
                    }
                </Flex>
            </Skeleton>
        </>
    )
}


export default MenuBar;