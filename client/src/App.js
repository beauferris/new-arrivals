import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import data from '../src/products.json'
import ProductItem from './components/ProductItem';
import SiteButton from './components/SiteButton';

import MenuBar from './components/UI/MenuBar';
import Feed from './components/Feed';
import Settings from './components/Settings';
import ShopSearch from './components/UI/ShopSearch';
import LazyLoad from 'react-lazyload';


import {
  Skeleton,
  Spinner,
  Modal,
  ModalOverlay,
  Box,
  useToast,
  Divider
} from "@chakra-ui/react"

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


const allShops = [{ name: "tres-bien", isActive: true, checked: true },
{ name: "haven", isActive: true, checked: false },
{ name: "uniqlo-womens", isActive: true, checked: true },
{ name: "uniqlo-mens", isActive: true, checked: true },
{ name: "kollektion", isActive: true, checked: true },
{ name: "zara-womens", isActive: true, checked: true }]


function App() {

  const [shops, setShops] = useState(JSON.parse(localStorage.getItem('localShops')) || allShops)
  const [search, setSearch] = useState("")
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('localFavorites')) || [])
  const toast = useToast()

  const fetchProducts = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/products")
      .then(res => {
        setProducts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
        setLoading(false);
      }).catch(err => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    localStorage.setItem('localShops', JSON.stringify(shops))
    localStorage.setItem('localFavorites', JSON.stringify(favorites))
  }, [favorites, shops])

  useEffect(() => {
    fetchProducts();
  }, [shops])


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
    const index = shops.findIndex(shop => shop.name === event.target.value);
    const shopsCopy = [...shops];

    shopsCopy[index].checked ? shopsCopy[index].isActive = false : shopsCopy[index].isActive = true;
    shopsCopy[index].checked = !shopsCopy[index].checked;
    setShops(shopsCopy)

    toast({
      position: "bottom-left",
      duration: 2000,
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          {shopsCopy[index].checked ? "Subscribed to " + shopsCopy[index].name : "unsubscribed to " + shopsCopy[index].name}
        </Box>
      ),
    })
  }

  //update shop filter on click
  const updateShops = (event) => {
    setLoading(true)
    const index = shops.findIndex(site => site.name === event.target.value);
    const filterShopsCopy = [...shops];
    filterShopsCopy[index].isActive = !filterShopsCopy[index].isActive;
    setShops(filterShopsCopy)
    
  }

  //return active shops
  const active = shops.filter(site => site.isActive === true).map(store => {
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
    //  </LazyLoad>
    )
  })


  //return user picked sites
  const mySites = shops.filter(shop => shop.checked === true).map((site, index) =>
    <SiteButton key={index} name={site.name} isActive={site.isActive} filter={updateShops} />
  )

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Divider />
        <Routes>
          <Route path='/' element={<Feed loading={loading} mySites={mySites} products={products} />} />
          <Route path='/settings' element={<Settings />}>
            <Route path='shop' element={<ShopSearch search={search} toggle={toggleShop} sites={shops} searchInput={searchListener} />} />
            <Route path='favorites' element={<Feed products={myFavorites} />} />
          </Route>
        </Routes>
      </Router>

      {/* <Modal isOpen={loading}>
        <ModalOverlay>
        </ModalOverlay>
      </Modal> */}
    </div>
  );
}

export default App;
