import { Box, Heading, Skeleton } from "@chakra-ui/react";
import Feed from "../components/Feed";
import { useAuth0 } from "@auth0/auth0-react";
const FavoritesFeed = (props) => {
    const {isLoading } = useAuth0();
    return (<Box>
         <Skeleton m={{ base: '2', md: '5' }}  isLoaded={!props.loadingFeed && !isLoading}><Heading >Favorites</Heading></Skeleton>
        
        <Feed loadingFeed={isLoading} loading={props.loadingFeed} products={props.products} />
    </Box>
    )
}

export default FavoritesFeed;