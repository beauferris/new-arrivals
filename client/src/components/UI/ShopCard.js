import { Box, Flex, Button, Spacer, Image,Text } from "@chakra-ui/react"

const ShopCard = (props) => {
    return (
        <Flex borderBottom='1px' borderColor='gray.200' >
            <Image boxSize='40px' src={props.favicon} mb='2' />

            <Box 
            
              ml={2} 
              overflow='hidden' 
              display='inline-block' 
              textOverflow='ellipsis' 
              whiteSpace='nowrap' 
              
              width='100%'
             >
                <Text fontWeight='semibold'  isTruncated>{props.name.replace("shop.","")}</Text>
                <Text fontSize={15} isTruncated >{props.url}</Text>
            </Box >
            <Spacer />

            <Button
                h={7}
                boxShadow='base'
                pl={6}
                pr={6}
                fontSize={15}
                onClick={props.toggle}
                value={props.name}
                bg={props.checked? "black" : "rgb(238,242,247)"}
                color={props.checked? "white" : " "}>
                
                {props.checked ? "Following" : "Follow"}
            </Button>
        </Flex>)
}

export default ShopCard;