import { Box, Flex, Button, Spacer, Image,Text } from "@chakra-ui/react"

const RadioCard = (props) => {
    return (
        <Flex>
            <Image boxSize='60px' src={props.favicon} />

            <Box ml={2}>
                <Text>{props.name.replace("shop.","")}</Text>
                <Text fontSize={15}>full url</Text>
            </Box>
            <Spacer />

            <Button
                justifyContent='flex-end'
                fontSize={15}
                onClick={props.toggle}
                value={props.name}>
                {JSON.parse(props.checked) ? "Following" : "Follow"}
            </Button>
        </Flex>)
}

export default RadioCard;