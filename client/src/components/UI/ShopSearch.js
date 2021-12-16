import {
    Input,
    Box,
    InputGroup,
    InputLeftElement,
    FormLabel,
    SimpleGrid
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';



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
            <SimpleGrid minChildWidth={'400px'} spacing={5}>
                {props.sites}
            </SimpleGrid>           
        </Box>   
    )
}

export default ShopSearch;