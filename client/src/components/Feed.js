import {
    Spinner,
    Box,
   
} from '@chakra-ui/react';
import './Feed.css';

import Masonry from "react-masonry-css";

const Feed = (props) => {

    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        800: 2,
        500: 1
    };

    return (
        <>
            <Box className='site-bar' >
                {props.mySites}
            </Box>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {props.loading ? <Spinner size="xl" className='loading' /> : props.products}
            </Masonry>
        </>
    )
}

export default Feed;