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
import { forceCheck } from 'react-lazyload';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

import './ProductItem.css'
//   {/* <LazyLoad className="product"  offset={200} placeholder={<Skeleton minHeight={500}/>} > */}

const ProductItem = (props) => {
    let favorited = props.isFavorite;
    let shop = props.icon;
    forceCheck()
    return (
        <Box >
            <Skeleton speed='2' mb="1" mt="1" isLoaded={!props.loading} >
                <Link href={props.url} target='_blank' rel="noreferrer">

                    <Img
                        className="product"
                        loading="lazy"
                        width="700px" 
                        mb={2}
                        srcSet={props.img}
                        alt={props.title} />
                </Link> </Skeleton>


            <Grid templateColumns="40px 1fr auto ">

                <Skeleton speed='2' isLoaded={!props.loading} >
                    <GridItem  >
                        <Image src={shop?.favicon}></Image>
                    </GridItem>
                </Skeleton>

                <SkeletonText speed='2' ml='1' mr='1' mb='2' isLoaded={!props.loading} >
                    <Heading colSpan={1} m='0' p='0' fontSize='md'>{props.brand}</Heading>
                    <Text fontSize='m'>{props.title ?? 'sampletext'}</Text>
                </SkeletonText>

                <GridItem >
                    <Skeleton speed='2' isLoaded={!props.loading}>
                        <IconButton m='0'
                            value={props.identifier}
                            onClick={props.toggleFavorite}
                            icon={favorited ? <IoIosHeart style={{ color: 'red' }} /> : <IoIosHeartEmpty style={{ color: 'red' }} />}
                        /></Skeleton></GridItem>
            </Grid>
        </Box>
    )
}

export default ProductItem