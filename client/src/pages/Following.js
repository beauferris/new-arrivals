import { Box, Heading } from "@chakra-ui/react"
import Shops from "../components/Shops"

const Following = (props) => {
    return (
        <Box >
            <Heading m='3' >Following</Heading>
            <Shops follows={props.follows} />
        </Box>
    )
}

export default Following