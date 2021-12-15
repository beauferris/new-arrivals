import {
    Input, Button, Box, InputGroup, InputLeftAddon, InputRightAddon, FormLabel, FormErrorMessage
} from '@chakra-ui/react'
import axios from 'axios';

import { useState } from 'react'

const AddShop = (props) => {

    const [shop, setShop] = useState("");
    const [error, setErrorMessage] = useState("");

    const onUrlChange = (event) => {
        setShop(event.target.value)
    }

    const submitUrl = (event) => {
        event.preventDefault()


        try {
            let shopURL = new URL(shop)

            const shopObject = {
                url: shop,
                checked: "false",
                isActive: "false",
                name: shopURL.host
            }
    
            axios.post('http://localhost:5001/create', shopObject)
                .then((res) => {
                    if (res.data === "store already exists") {
                        console.log("Store Already Exists")
                        setErrorMessage("Store Already Exists")
                    } else if (res.data === "incorrect format") {
                        console.log("Incorrect Format")
                        setErrorMessage("Incorrect Format")
                    }
                    else {
                        let stored = JSON.parse(localStorage.getItem("localShops"))
                        stored.push(shopObject)
                        localStorage.setItem("localShops", JSON.stringify(stored))
                        setErrorMessage(shopObject.name + " Added!")
                    }
                }).catch((error) => {
                    console.log(error)
                    setErrorMessage("Incorrect URL format")
                })
        }catch (error) {
            setErrorMessage("Incorrect URL format")
        }
    }

    return (
        <Box m='2'>
            <form onSubmit={submitUrl}>
                <FormLabel htmlFor='url'>Add a shop</FormLabel>
                <InputGroup>
                    <InputLeftAddon >https://</InputLeftAddon>
                    <Input
                        type='url'
                        id='url'
                        placeholder='https://shop.com/new-arrivals/products.json'
                        onChange={onUrlChange}
                        mb='2'
                    />
                

                </InputGroup>
                {error ? <h1>{error}</h1> : ""}
                <Button type="submit" >Add</Button>
            </form>
        </Box>
    )
}

export default AddShop