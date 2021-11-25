
import { Button, Text, useColorMode } from "@chakra-ui/react"
const SiteButton = (props) => {
    const { colorMode } = useColorMode()
    return (
        <>
            <Button onClick={props.filter}
                value={props.name}
                margin='1'
                variant={props.isActive ? "solid" : 'ghost'}
                colorScheme={colorMode==='dark'?'pink':'gray'}
                // padding='2'
               
            >

                {props.name}
            </Button>
        </>
    )
}
export default SiteButton