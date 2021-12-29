import {
    Box

} from '@chakra-ui/react';
import './Feed.css';
import ProductItem from './ProductItem';

import Masonry from "react-masonry-css";
const placeholders = [
    {
        "_id": "6196ec14b28525759dc56910",
        "brand": "uniqlo", "title": "extra fine cotton ",
        "price": "$29.90", "url": "https://uniqlo.com/us/en/extra-fine-cotton-broadcloth-long-sleeve-shirt-441714.html?dwvar_441714_color=COL03",
        "img": "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/441714/item/goods_03_441714.jpg?width=380",
        "store": "uniqlo-mens", "date": 1637280786519
    }]

const Feed = (props) => {
    const skeleton = placeholders.map((product, index) => {
        return (
            <>
                <ProductItem
                    key={index}
                    loading={props.loading}
                    store={product.store}
                    url={product.url}
                    img={product.img}
                    brand={product.brand}
                    title={product.title}
                    price={product.price}
                ></ProductItem>
            </>)
    })


    const breakpointColumnsObj = {
        default: 4,
        1600: 3,
        1100: 2,
        700: 1
    };

    return (
        <>
            <Box
                position='sticky'
                top='0'
                backdropFilter='blur(15px)'
                bgColor="rgb(249, 249, 249,0.85)"
                zIndex='1'
                width='100%'
                className='site-bar' >
                {props.mySites}
            </Box>


            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {props.loading ? Array.from({ length: 16 }, () => skeleton) : null}
                {props.products}
            </Masonry>

        </>
    )
}

export default Feed;