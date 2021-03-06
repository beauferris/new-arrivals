import { Input, Box, InputGroup, InputLeftElement, FormLabel, Heading, Text, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Shops from '../components/Shops';
import CategoryCard from '../components/CategoryCard';

import { Outlet } from 'react-router-dom';
const ShopSearch = (props) => {
    return (
        <Box m={{ base: '3', md: '5' }}>
            <Heading mb='5' htmlFor='Search'>Search</Heading>
            <Box className="search">
                <InputGroup  >
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="black.300" />}
                    />
                    <Input

                        w={{ base: '500px', md: '600px' }}
                        id='search'
                        variant="filled"
                        placeholder="eg. stussy.com / stussy"
                        onChange={props.searchInput} />

                </InputGroup >
                <Shops follows={props.sites} />
                {/* <Text color='gray.500' size='sm' mb='5'>Search a website or brand</Text> */}
                <FormLabel fontWeight='semibold'>Recommended</FormLabel>
                <Box>
                    <Shops follows={props.recommended} />
                </Box>
                <FormLabel fontWeight='semibold' >Categories</FormLabel>
                <CategoryCard shops={props.shops}/>

               
            </Box>
        </Box>
    )
}

export default ShopSearch;