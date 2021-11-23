import {
    Input,
    Box,
    InputGroup,
    InputLeftElement,
    Checkbox,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const ShopSearch = (props) => {
   
    let shops = props.sites;

    const shopLibrary = shops.filter(shop => shop.name.includes(props.search)).map(shop => {
        return (<Box >
            <Checkbox
                type='radio'
                isChecked={shop.checked}
                onChange={props.toggle}

                value={shop.name} >{shop.name}</Checkbox>
        </Box>)
    })

    return (
        <Box className="search">
            <InputGroup >
                <InputLeftElement

                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    mb='4'
                    w='80%'
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