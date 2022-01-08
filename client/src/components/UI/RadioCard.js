import { Box, Flex, Button, Spacer, Image,Text } from "@chakra-ui/react"

const RadioCard = (props) => {
    return (
        <Flex borderBottom='1px' borderColor='gray.200' >
            <Image boxSize='60px' src={props.favicon} mb='2' />

            <Box 
            
              ml={2} 
              overflow='hidden' 
              display='inline-block' 
              textOverflow='ellipsis' 
              whiteSpace='nowrap' 
              width='100%'
             >
                <Text  isTruncated>{props.name.replace("shop.","")}</Text>
                <Text fontSize={15} isTruncated >{props.url}</Text>
            </Box >
            <Spacer />

            <Button
                h={8}
                pl={6}
                pr={6}
                fontSize={15}
                onClick={props.toggle}
                value={props.name}>
                {props.checked ? "Following" : "Follow"}
            </Button>
        </Flex>)
}

export default RadioCard;