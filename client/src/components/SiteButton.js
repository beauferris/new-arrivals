
import { Button } from '@chakra-ui/button';
const SiteButton = (props) => {
    return (
        <>
            <Button onClick={props.filter}
                value={props.name}
                margin='1'
                colorScheme={props.isActive ? 'blue' : 'teal'}>
                {props.name}
            </Button>
        </>
    )
}
export default SiteButton