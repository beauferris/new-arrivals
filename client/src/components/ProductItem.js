import {
    Box,
    Text,
    Heading,
    Img,
    Link,
    Grid,
    IconButton,
    GridItem,
    Skeleton,
    SkeletonText,
    Image
} from "@chakra-ui/react"
import LazyLoad, { forceCheck } from 'react-lazyload';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

import './ProductItem.css'
//   {/* <LazyLoad className="product"  offset={200} placeholder={<Skeleton minHeight={500}/>} > */}

const ProductItem = (props) => {
    let favorited = props.isFavorite;
    let shop = props.icon;
    forceCheck()
    return (
        <Box className="product" >
            <Skeleton speed='2' mb="1" mt="1" isLoaded={!props.loading} >
                <Link href={props.url} target='_blank' rel="noreferrer">

                    <Img
                        border='1px'
                        borderColor='gray.200'
                        // className="product"
                        width="700px"
                        mb={2}
                        srcSet={props.img}
                        alt={props.title} />
                </Link> </Skeleton>


            <Grid templateColumns="minmax(0, 1fr) auto ">

                {/* <Skeleton speed='2' isLoaded={!props.loading} >
                    <GridItem  >
                        <Image src={shop?.favicon}></Image>
                    </GridItem>
                </Skeleton> */}

                <GridItem>
                    <SkeletonText speed='2' ml='1' mr='1' mb='2' isLoaded={!props.loading} >
                        
                            <Heading isTruncated colSpan={1} m='0' p='0' fontSize='md'>{props.brand}</Heading>

                            <Text
                                isTruncated
                                fontSize='m' >
                                {props.title ?? 'sampletext'}</Text> 
                    </SkeletonText>
                </GridItem>

                <GridItem >
                    <Skeleton speed='2' isLoaded={!props.loading}>
                        <IconButton m='0'
                            bg={'white'}
                            border={'none'}
                           _hover={{transform:"scale(1.3)"}} 
                            value={props.identifier}
                            onClick={props.toggleFavorite}
                            icon={favorited ? <IoIosHeart size={'30px'} style={{ color: 'red' }} /> : <IoIosHeartEmpty size={'30px'} style={{ color: 'red' }} />}
                        /></Skeleton></GridItem>
            </Grid>
        </Box>
    )
}

export default ProductItem