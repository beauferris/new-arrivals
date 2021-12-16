import {
    Input,
    Box,
    InputGroup,
    InputLeftElement,
    Checkbox,
    FormLabel,
    Img,
    Icon,
    Image,
    Flex,
    Divider,
    useRadioGroup,
    HStack,
    Radio,
    VStack, RadioGroup, SimpleGrid
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import RadioCard from './RadioCard';




const ShopSearch = (props) => {
    return (
        <Box className="search">
            <FormLabel htmlFor='Search'>Search for a Shop</FormLabel>
            <InputGroup mb={2}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    mb='1'
                    id='search'
                    variant="filled"
                    placeholder="Search Shops!"
                    onChange={props.searchInput} />
            </InputGroup >
            <SimpleGrid minChildWidth={'350px'} spacing={5}>
                {props.sites}
            </SimpleGrid>           

        </Box>
        
    )
}

export default ShopSearch;