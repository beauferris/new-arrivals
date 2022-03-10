import { Box, Heading } from "@chakra-ui/react"
import Shops from "../components/Shops"

const Following = (props) => {
    return (
        <Box m={{ base: '2', md: '5' }}>
            <Heading mb='5' >Following</Heading>
            <Shops follows={props.follows} />
        </Box>
    )
}

export default Following