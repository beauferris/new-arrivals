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
            <InputGroup >
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
            <Text mb={7}>*Check if your favorite shops are in our database</Text>
            <SimpleGrid minChildWidth={'300px'} spacing={3}>
                {props.sites}
            </SimpleGrid>
        </Box>
    )
}

export default ShopSearch;