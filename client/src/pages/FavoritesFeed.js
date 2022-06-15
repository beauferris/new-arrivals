import { Box, Heading, Skeleton , Divider} from "@chakra-ui/react";
import Feed from "../components/Feed";
import { useAuth0 } from "@auth0/auth0-react";
const FavoritesFeed = (props) => {
    const {isLoading } = useAuth0();
    return (<Box>
         <Skeleton m='2' isLoaded={!props.loadingFeed && !isLoading}><Heading >Favorites</Heading></Skeleton>
        
        <Feed loadingFeed={isLoading} loading={props.loadingFeed} products={props.products} />
        <Divider  />
    </Box>
    
    )
}

export default FavoritesFeed;