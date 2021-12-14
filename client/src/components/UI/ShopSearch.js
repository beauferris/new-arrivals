import {
    Input,
    Box,
    InputGroup,
    InputLeftElement,
    Checkbox,
    FormLabel
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const ShopSearch = (props) => {

    let shops = props.sites;

    const shopLibrary = shops.filter(shop => shop.name.includes(props.search)).map(shop => {
        return (<Box >
            <Checkbox
                type='radio'
                isChecked={JSON.parse(shop.checked)}
                onChange={props.toggle}
                value={shop.name}>{shop.name}</Checkbox>
        </Box>)
    })

    return (
        <Box className="search">
             <FormLabel htmlFor='Search'>Search for a Shop</FormLabel>
            <InputGroup >
           
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
            </InputGroup>
            <Box className='shops'>
                {shopLibrary}
            </Box>
        </Box>
    )
}

export default ShopSearch;