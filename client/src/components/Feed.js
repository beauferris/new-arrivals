import './Feed.css';
import Masonry from "react-masonry-css";
import SkeletonFeed from './UI/SkeletonFeed';

const Feed = (props) => {
 
    const Columns = {
        default: 3,
        1000: 2,
        600: 1
    };

    return (
        <>
            {/* <Box
                position='sticky'
                top='0'
                backdropFilter='blur(15px)'
                bgColor="rgb(249, 249, 249,0.85)"
                zIndex='1'
                width='100%'
                className='site-bar' >
                {props.mySites}
            </Box> */}

           
                <Masonry
                breakpointCols={Columns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
               {props.products}</Masonry>

        </>
    )
}

export default Feed;