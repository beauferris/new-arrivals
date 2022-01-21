import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react"
import Japanese from '../assets/japanese.jpeg'
import Techwear from '../assets/techwear.jpeg'
import Streetwear from '../assets/streetwear.png'
import Vintage from '../assets/vintage.png'

import Shops from "./Shops"
import { Route,Link, useParams } from "react-router-dom"

const CategoryCard = ({shops}) => {

    

    return (
        <SimpleGrid m='3' rows='1' columns={{ base: '2', md: '4' }} spacing={3}>
          <Link to='/shop/techwear'>
            <Box >
                <Image value='techwear' boxShadow='base' rounded='lg' src={Techwear} />
                <Text  fontWeight='semibold' >Techwear</Text>
            </Box>
            </Link>

            <Link to='/shop/streetwear'>
            <Box>
                <Image boxShadow='base' rounded='lg' src={Streetwear} />
                <Text fontWeight='semibold' >Streetwear</Text>
            </Box>
            </Link>

            <Link to='/shop/japanese'>
            <Box>
                <Image boxShadow='base' rounded='lg' src={Japanese} />
                <Text fontWeight='semibold' >Japanese</Text>
            </Box>
            </Link>

            <Link to='/shop/vintage'>
            <Box >
                <Image boxShadow='base' rounded='lg' src={Vintage} />
                <Text fontWeight='semibold'>Vintage</Text>
            </Box>
            </Link>
        </SimpleGrid>
    )
}

export default CategoryCard