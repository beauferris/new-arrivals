import { Input, Box, InputGroup, InputLeftElement, FormLabel, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Shops from '../components/Shops';

const ShopSearch = (props) => {
    return (
        <Box>
            <Heading m='3' htmlFor='Search'>Search</Heading>
            <Box m='3' className="search">
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
                <Shops follows={props.sites} />
                <FormLabel>Recommended</FormLabel>
                <Box>
                    <Shops follows={props.recommended} />
                </Box>
            </Box>
        </Box>
    )
}

export default ShopSearch;