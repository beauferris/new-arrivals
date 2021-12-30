import {
    Input,
    Box,
    InputGroup,
    InputLeftElement,
    FormLabel,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';



const ShopSearch = (props) => {
    return (
        <Box m='3' className="search">
            <FormLabel htmlFor='Search'>Search</FormLabel>
            <InputGroup mb='6'>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input

                    id='search'
                    variant="filled"
                    placeholder="Search Shops!"
                    onChange={props.searchInput} />

            </InputGroup >
            <SimpleGrid minChildWidth={'300px'} spacing={3}>
                {props.sites}
            </SimpleGrid>
        </Box>
    )
}

export default ShopSearch;