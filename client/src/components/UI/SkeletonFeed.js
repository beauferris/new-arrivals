import SkeletonProduct from "./SkeletonProduct"
import Masonry from "react-masonry-css";

const SkeletonFeed = () => {

    const Columns = {
        default: 3,
        1000: 2,
        700: 1
    };
    return (
        <Masonry
                breakpointCols={Columns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
          
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
                <SkeletonProduct/>
            
        </Masonry>)
}

export default SkeletonFeed