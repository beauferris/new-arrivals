import { Button } from "@chakra-ui/react"
const SiteButton = (props) => {
    return (
        <>
            <Button onClick={props.filter}
                value={props.name}
                margin='1'
                h='8'
                fontSize='13'
                bgColor={props.isActive ? 'rgb(260, 260, 260)' : ''}
                variant={props.isActive ? "solid" : 'ghost'}
            >
                <img alt="" style={{ width: '15px', marginRight: '2px' }} src={props.logo} />
                {props.name}
            </Button>
        </>
    )
}
export default SiteButton