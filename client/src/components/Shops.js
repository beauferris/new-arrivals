import {SimpleGrid,
} from '@chakra-ui/react';

const Shops = (props) =>{
    return(
        <SimpleGrid m='3' columns={{base:'1', sm:'2', md:'3' }} spacing={5}>
            {props.follows}
        </SimpleGrid>
    )
}

export default Shops;
