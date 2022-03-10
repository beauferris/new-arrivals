import { Box, Divider, Heading, Spacer } from "@chakra-ui/react"
import Shops from "../components/Shops"

const Following = (props) => {
    return (
        <>
    
        <Box   m='2'>
            <Heading mb='5' >Following</Heading>
            <Shops follows={props.follows} />
            <Divider  m='10' />
       
            
        </Box>
    
    
        </>
        
    )
}

export default Following