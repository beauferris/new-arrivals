import { Box, Heading } from "@chakra-ui/react";
import Feed from "../components/Feed";

const FavoritesFeed = (props) => {
    return (<Box>
        <Heading m='3'>Favorites</Heading>
        <Feed products={props.products} />
    </Box>
    )
}

export default FavoritesFeed;