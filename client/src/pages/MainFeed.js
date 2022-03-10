import Feed from "../components/Feed"
import { Heading, Skeleton } from "@chakra-ui/react"
import { useAuth0 } from "@auth0/auth0-react";


const MainFeed = ({ products, loadingFeed }) => {
    
    const {isLoading } = useAuth0();
    return (
        <>
            <Skeleton m={{ base: '2', md: '5' }} width='30%' isLoaded={!loadingFeed && !isLoading}>
               
            </Skeleton>

            <Feed loadingFeed={isLoading} loading={loadingFeed} products={products} />
        </>
    )
}

export default MainFeed