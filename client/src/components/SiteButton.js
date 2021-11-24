
import { Button } from '@chakra-ui/button';
const SiteButton = (props) => {
    return (
        <>
            <Button onClick={props.filter}
                value={props.name}
                margin='1'
                variant={props.isActive ?'solid':'ghost'  }
                colorScheme="gray">
                
                {props.name}
            </Button>
        </>
    )
}
export default SiteButton