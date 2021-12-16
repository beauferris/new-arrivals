
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './components/ProductItem';
import SiteButton from './components/SiteButton';
import MenuBar from './components/UI/MenuBar';
import Feed from './components/Feed';
import Settings from './components/Settings';
import ShopSearch from './components/UI/ShopSearch';
// import LazyLoad from 'react-lazyload';
import AddShop from './components/AddShop';
import RadioCard from './components/UI/RadioCard';
import {
  Box,
  Button,
  useToast,
  Divider
} from "@chakra-ui/react"

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [shops, setShops] = useState([])
  const [search, setSearch] = useState("")
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('localFavorites')) || [])
  const toast = useToast()
  const [myShops, setMyShops] = useState(JSON.parse(localStorage.getItem('localShops')) || [])

  const fetchProducts = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/products")
      .then(res => {
        setProducts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
        setLoading(false);
      }).catch(err => console.log(`Error: ${err}`));
  }

  const fetchShops = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/shops")
      .then(res => {

        if (JSON.parse(localStorage.getItem('localShops')).length === 0) {
          localStorage.setItem('localShops', JSON.stringify(res.data))
        }
        setMyShops(JSON.parse(localStorage.getItem('localShops')) || res.data)

        // 
      }).catch(err => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    localStorage.setItem('localShops', JSON.stringify(myShops))
    localStorage.setItem('localFavorites', JSON.stringify(favorites))
  }, [favorites, myShops])

  useEffect(() => {
    fetchProducts();
  }, [myShops])

  useEffect(() => {
    fetchShops();
  }, [])

  const searchListener = (event) => {
    setSearch(event.target.value)
  }

  const favoriteItem = (event) => {
    const value = event.currentTarget.value;
    const newFavs = [...favorites]
    const index = allProducts.findIndex(index => index.title === value)
    const product = allProducts[index]
    console.log(product)
    const check = newFavs.some(check => {
      return check.title === value
    })
    if (check) {
      const indexFav = newFavs.findIndex(fav => fav.title === value)
      newFavs.splice(indexFav, 1)
    } else {
      newFavs.push(product);
    }
    setFavorites(newFavs)
  }

  //add shop to user list
  const toggleShop = (event) => {

    setMyShops(myShops =>
      myShops.map((shop) =>
        shop.name === event.currentTarget.value
          ? {
            ...shop,
            checked: !JSON.parse(shop.checked),
            isActive: !JSON.parse(shop.checked)
          } : shop
      )
    )

    // const index = myShops.findIndex(shop => shop.name === event.currentTarget.value);
    // const shopsCopy = [...myShops];
    // shopsCopy[index].checked = !JSON.parse(shopsCopy[index].checked) 
    // shopsCopy[index].isActive = shopsCopy[index].checked
    // setMyShops(shopsCopy)

    // toast({
    //   position: "bottom-left",
    //   duration: 2000,
    //   render: () => (
    //     <Box color="white" p={3} bg="blue.500">
    //       {myShops[index].checked ? "Subscribed to " + myShops[index].name : "unsubscribed to " + shopsCopy[index].name}
    //     </Box>
    //   ),
    // })
  }

  //update shop filter on click
  const updateShops = (event) => {
    setLoading(true)
    const index = myShops.findIndex(site => site.name === event.target.value);
    const filterShopsCopy = [...myShops];
    filterShopsCopy[index].isActive = !JSON.parse(filterShopsCopy[index].isActive);
    setMyShops(filterShopsCopy)

  }

  //return active shops
  const active = myShops.filter(site => JSON.parse(site.isActive) === true).map(store => {
    return store.name
  })

  const myFavorites = favorites.map((product, index) => {
    return (
      <>
        <ProductItem
          key={index}
          loading={loading}
          toggleFavorite={favoriteItem}
          store={product.store}
          url={product.url}
          img={product.img}
          brand={product.brand}
          title={product.title}
          price={product.price}
          isFavorite={favorites.find((item) => item.title === product.title)}
        ></ProductItem>
      </>)
  })

  //return products filtered by active filter
  const products = allProducts.filter(product => active.includes(product.store)).map((product, index) => {
    return (
      //  <LazyLoad key={index} placeholder={<p>loading...</p>}>
      <ProductItem
        key={product.id}
        loading={loading}
        toggleFavorite={favoriteItem}
        store={product.store}
        url={product.url}
        img={product.img}
        brand={product.brand}
        title={product.title}
        price={product.price}
        isFavorite={favorites.find((item) => item.title === product.title)}
      ></ProductItem>
      //  </LazyLoad>
    )
  })

  //return user picked sites
  const mySites = myShops.filter(shop => JSON.parse(shop.checked) === true).map((site, index) =>
    <SiteButton logo={site.logo} key={index} name={site.name} isActive={site.isActive} filter={updateShops} />
  )

  const allSites = myShops.filter(shop => shop.name.includes(search)).map(shop => {
    return (
      <>
      
        <RadioCard name={shop.name} value={shop.name} checked={JSON.parse(shop.checked)} toggle={toggleShop} />
      </>)
  })

  return (
    <div className="App">
      <Router>
        <MenuBar />

        <Divider />
        <Routes>
          <Route exact path='/' element={<Feed loading={loading} mySites={mySites} products={products} />} />
          <Route path='/settings' element={<Settings />}>
            <Route path='shop' element={<ShopSearch search={search} sites={allSites} searchInput={searchListener} />} />
          </Route>
          <Route path='favorites' element={<Feed products={myFavorites} />} />
          <Route path='add' element={<AddShop />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
