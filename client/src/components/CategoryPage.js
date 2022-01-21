
import { Box, Image,Flex,Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom"
import ShopCard from "./UI/ShopCard";
import Shops from "./Shops";

const CategoryPage = ({ userData, shops, toggle }) => {
    const { id } = useParams();

    const searchShops = shops.filter(shop => shop.search?.some(item => item.includes(id))).map((shop) => {
        return (<ShopCard
            key={shop._id}
            name={shop.name}
            url={shop.url}
            value={shop.name}
            checked={userData?.shops?.includes(shop.name)}
            toggle={toggle}
            favicon={shop.favicon} />)
    })

    return (
        <Box >
            <Flex m='3' justifyContent='center'>
                <Image rounded='md' boxShadow='md' w='100%' h='150px' objectFit='cover' src={`/assets/${id}.jpeg`} />
            </Flex>
            <Text fontWeight='semibold' m='3' mb='8'>Search -> {id} </Text> 

            <Box m={{ base: '3', md: '5' }}>
                <Shops follows={searchShops} />
            </Box>
        </Box>

    )
}

export default CategoryPage