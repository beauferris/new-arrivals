import Feed from "../components/Feed"
import React, { useContext } from "react"
import ProductsContext from "../context/products-context"
import { Heading } from "@chakra-ui/react"


const MainFeed = ({ products }) => {
    const msg = useContext(ProductsContext)

    return (
        <>
            <Heading m='3'>{msg.msg}</Heading>
            <Feed products={products} />
        </>
    )
}

export default MainFeed