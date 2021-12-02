
import { Button, Text, useColorMode } from "@chakra-ui/react"
const SiteButton = (props) => {

    return (
        <>
            <Button onClick={props.filter}
                value={props.name}
                margin='1'
                h='9'
                bgColor={props.isActive? 'rgb(229, 229, 229)' :''}
                variant={props.isActive ? "solid" : 'ghost'}
                backdropFilter="blur(15px)"
            >
                {props.name}
            </Button>
        </>
    )
}
export default SiteButton