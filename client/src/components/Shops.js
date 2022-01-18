import {SimpleGrid,
} from '@chakra-ui/react';

const Shops = (props) =>{
    return(
        <SimpleGrid m='3' minChildWidth={'300px'} spacing={5}>
            {props.follows}
        </SimpleGrid>
    )
}

export default Shops;
