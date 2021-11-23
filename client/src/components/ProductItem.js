import './ProductItem.css'

import {
    Box,
    Text,
    Heading,
    Img,
    Link,
    Grid,
    IconButton,
    GridItem
} from "@chakra-ui/react"

import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

const ProductItem = (props) => {
    let favorited = props.isFavorite;
    return (
        <Box>
            <Link href={props.url} target='_blank' rel="noreferrer">
                <Img
                    border="1px"
                    w="100%"
                    borderColor="gray.200"
                    srcSet={props.img}
                    mt={2}

                    d="inline-block"
                    alt={props.title} />
            </Link>

            <Grid templateColumns="60px 1fr ">
            <GridItem rowSpan={2} colSpan={1}  >  <IconButton colSpan={1}
                    value={props.title}
                    onClick={props.toggleFavorite}
                    icon={favorited ? <IoIosHeart style={{ color: 'red' }} /> : <IoIosHeartEmpty style={{ color: 'red' }} />}
                /></GridItem>  
               
                <Heading colSpan={1}  m='0' p='0' fontSize='md'>{props.store}</Heading>
                <Text fontSize='m'>{props.title}</Text>
            </Grid>



        </Box>
    )
}

export default ProductItem