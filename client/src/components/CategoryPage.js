import { useParams } from "react-router-dom"
import ShopCard from "./UI/ShopCard";
import Shops from "./Shops";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login/LoginButton";
import {
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,

    ModalBody,
    ModalCloseButton,
    Box, Image, Flex, Text, useDisclosure
} from "@chakra-ui/react"

const CategoryPage = ({ userData, shops, toggle }) => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, isAuthenticated } = useAuth0();

    const searchShops = shops.filter(shop => shop.search?.some(item => item.includes(id))).map((shop) => {
        return (<ShopCard
            key={shop._id}
            name={shop.name}
            url={shop.url}
            value={shop.name}
            checked={userData?.shops?.includes(shop.name)}
            toggle={isAuthenticated ? toggle : onOpen}
            favicon={shop.favicon} />)
    })

    return (
        <Box >
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
            <Flex m='3' justifyContent='center'>
                <Image rounded='md' boxShadow='md' w='100%' h='150px' objectFit='cover' src={`/assets/${id}.jpeg`} />
            </Flex>
            <Text fontWeight='semibold' m='3' mb='8'><Link style={{ color: "navy" }} to="/shop">Search</Link> > {id} </Text>

            <Box m={{ base: '3', md: '5' }}>
                <Shops follows={searchShops} />
            </Box>
        </Box>

    )
}

export default CategoryPage