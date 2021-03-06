import {Input, Icon, Button, Box, InputGroup, InputLeftAddon,Heading}from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'

const AddShops = (props) => {
    const ShopifyIcon = (props) => (
        <Icon
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414" {...props}>
            <path fill="#7AB55C"
                d="M10.225 15.987l4.81-1.042S13.3 3.203 13.285 3.125c-.012-.077-.076-.128-.14-.128-.065 0-1.286-.09-1.286-.09s-.85-.85-.96-.94c-.03-.025-.05-.038-.08-.05l-.61 14.07zm-2.418-8.45s-.54-.283-1.183-.283c-.965 0-1.003.605-1.003.76 0 .822 2.16 1.144 2.16 3.086 0 1.53-.96 2.508-2.27 2.508-1.57 0-2.36-.978-2.36-.978l.43-1.39s.83.71 1.52.71c.45 0 .65-.362.65-.62 0-1.08-1.77-1.13-1.77-2.906C3.96 6.932 5.03 5.48 7.2 5.48c.838 0 1.25.24 1.25.24l-.63 1.81zM7.447.553c.09 0 .18.026.27.09-.656.31-1.376 1.093-1.672 2.662-.437.142-.862.27-1.26.386C5.132 2.5 5.968.56 7.447.56zM8.27 2.52v.09c-.502.155-1.055.322-1.595.49.31-1.184.888-1.762 1.39-1.98.128.333.205.784.205 1.4zm.36-1.49c.463.05.76.578.952 1.17-.232.077-.49.154-.772.244v-.167c0-.502-.064-.914-.18-1.248zm1.994.86c-.013 0-.04.014-.052.014-.013 0-.193.05-.476.14-.282-.822-.784-1.58-1.672-1.58h-.077C8.09.14 7.78 0 7.51 0 5.44 0 4.45 2.585 4.14 3.897c-.796.244-1.375.425-1.44.45-.45.142-.462.155-.514.58-.05.308-1.22 9.375-1.22 9.375L10.006 16l.617-14.11z"
            />
        </Icon>
    )

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
                name: shopURL.host,
            }
            
            axios.post('http://calm-harbor-25651.herokuapp.com/create', shopObject)
                .then((res) => {
                    console.log(shopObject.name)
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
        } catch (error) {
            setErrorMessage("Incorrect URL format")
        }
    }

    return (
        <Box m={{ base: '3', md: '5' }}>
            <form onSubmit={submitUrl}>
                <Heading mb='5' htmlFor='url'>Add</Heading>
             <Box >
                <InputGroup >
                    <InputLeftAddon > <ShopifyIcon boxSize={6} /></InputLeftAddon>
                    <Input
                    w={{ base: '500px', md: '600px' }}
                        type='url'
                        id='url'
                        placeholder='https://shop.com/new-arrivals/products.json'
                        onChange={onUrlChange}
                    />
                </InputGroup>
                </Box>
                {error ? <h1>{error}</h1> : ""}
                <Button mt='1' type="submit">Add</Button>
            </form>
            
        </Box>
    )
}

export default AddShops