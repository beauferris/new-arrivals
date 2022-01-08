
const Skeleton = () => {
    return (
        <>  
            <ProductItem
                key={index}
                loading={props.loading}
                store={product.store}
                url={product.url}
                img={product.img}
                brand={product.brand}
                title={product.title}
                price={product.price}
            ></ProductItem>
        </>)
}

export default Skeleton