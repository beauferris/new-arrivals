import { useRadio, Box, Flex, Button, Spacer, Image, Divider, Text, VStack } from "@chakra-ui/react"

const RadioCard = (props) => {
    return (
        <Flex>
            <Image boxSize={10} src='./assets/uniqlo.svg' />

            <Box ml={2}>
                <Text>{props.name}</Text>
                <Text fontSize={15}>fuck dis</Text>
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