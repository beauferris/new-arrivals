import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsContext from './context/products-context';
import CategoryPage from './components/CategoryPage';

//import UI components
import MenuBar from './components/UI/MenuBar';
import ShopCard from './components/UI/ShopCard';
import ProductItem from './components/ProductItem';

// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import qs from 'qs';

//auth
import { useAuth0 } from "@auth0/auth0-react";

//import page route components 
import AddShops from './pages/AddShops';
import Following from './pages/Following';
import FavoritesFeed from './pages/FavoritesFeed';
import MainFeed from './pages/MainFeed';
import ShopSearch from './pages/ShopSearch';


import {
  Divider, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,

  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from './components/login/LoginButton';



function App() {

  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState("")
  const [userData, setUserData] = useState([])
  const [allProducts, setProducts] = useState([])
  const [loading,] = useState(false)
  const [shops, setShops] = useState([])
  const [skip, setSkip] = useState(0)
  const [shopFeed, setShopFeed] = useState([])
  const {isOpen, onOpen, onClose} = useDisclosure()


  const fetchProducts = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/products", {
      params: { skip: skip, shops: shopFeed },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then(res => {
      setProducts(prevState => {
        return ([...new Set([...prevState, ...res.data])])
      })
      setSkip(s => s + 6)
    })
  }


  useEffect(() => {
    fetchProducts()
  }, [shopFeed])


  useEffect(() => {
    setShopFeed(userData?.shops)
    setSkip(0)
    setProducts([])
  }, [isAuthenticated, userData?.shops])

  useEffect(() => {
    console.log("updating userData")
    axios.post("https://calm-harbor-25651.herokuapp.com/update", userData)
  }, [userData])

  useEffect(() => {
    console.log("fetching userdata")
    const fetchUser = async () => {
      try {
        let ud = isAuthenticated ? await axios.get("https://calm-harbor-25651.herokuapp.com/user",
          { params: { email: user.email } }) : ""
        setUserData(ud.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [user, isAuthenticated])


  useEffect(() => {
    console.log("fetching shops")
    const fetchShops = () => {
      axios.get("https://calm-harbor-25651.herokuapp.com/shops")
        .then(res => {
          setShops(res.data)
          setShopFeed(res.data.map(shop => shop.name))
        }).catch(err => console.log(`Error: ${err}`));
    }
    fetchShops()
  }, [])

  //Search bar 
  const searchListener = (event) => {
    setSearch(event.target.value)
  }

  //add/remove products from favorites
  const favoriteItem = (event) => {
    axios.get(`http://localhost:5001/products/${event.currentTarget.value}`)
      .then(res => {
        let favorites = [...userData.favorites]
        let product = res.data
        let favs = favorites.map(product => product._id)

        if (favs.includes(product[0]._id)) {
          favorites.splice(favs.indexOf(product[0]._id), 1)
        } else {
          favorites = [...product, ...favorites]
        }

        setUserData({
          ...userData,
          favorites: favorites
        })
      })
  }

  //follow shops
  const toggleShop = (event) => {
    let shops = [...userData?.shops]

    if (shops.includes(event.currentTarget.value)) {
      let index = shops.indexOf(event.currentTarget.value)
      shops.splice(index, 1)
    } else {
      shops = [...shops, event.currentTarget.value]
    }

    setUserData({
      ...userData,
      shops: shops
    })
   
  }

  const allSites = search === "" ? "" :
    shops.filter(shop => shop.search?.some(item => item.includes(search))).map(shop => {
      return (<ShopCard
        key={shop._id}
        name={shop.name}
        url={shop.url}
        value={shop.name}
        checked={userData?.shops?.includes(shop.name)}
        toggle={toggleShop}
        favicon={shop.favicon} />)
    })

  //return favorites
  const myFavorites =
    userData?.favorites?.map((product, index) => {
      return (<ProductItem
        identifier={product.id}
        myId={product._id}
        key={product._id}
        loading={loading}
        toggleFavorite={favoriteItem}
        store={product.store}
        url={product.url}
        img={product.img}
        brand={product.brand}
        title={product.title}
        price={product.price}
        isFavorite={true}
        icon={shops.find((shop) => shop.name === product.store)}
      ></ProductItem>)
    })

  const follows = userData ?
    shops.filter(shop => userData?.shops?.includes(shop.name)).map(shop => {
      return (<ShopCard
        key={shop._id}
        name={shop.name}
        url={shop.url}
        value={shop.name}
        checked={userData.shops?.includes(shop.name)}
        toggle={toggleShop}
        favicon={shop.favicon} />)
    }) : " "

  const recommended =
    shops.map(shop => {
      return (<ShopCard
        key={shop._id}
        name={shop.name}
        url={shop.url}
        value={shop.name}
        checked={userData?.shops?.includes(shop.name)}
        toggle={toggleShop}
        favicon={shop.favicon} />)
    })

  //return products filtered by active filter
  const products = allProducts
    //.filter(product => activeCategories.includes(product.category))
    .map(product => {
      return (
        <ProductItem
          identifier={product.id}
          key={product._id}
          myId={product._id}
          loading={loading}
          toggleFavorite={isAuthenticated? favoriteItem : onOpen }
          store={product.store}
          url={product.url}
          img={product.img}
          brand={product.brand}
          title={product.title}
          price={product.price}
          isFavorite={isAuthenticated ? userData?.favorites?.find(item => item.id === product.id) : false}
          icon={shops.find((shop) => shop.name === product.store)}
        ></ProductItem>
      )
    })

  return (
    <ProductsContext.Provider value={{ msg: "Feed" }}>
      <div className="App">
        <Router>
         

          <MenuBar loading={loading} />
         <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login to customize feed and favourites</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LoginButton/>
            </ModalBody>
          </ModalContent>
        </Modal>
          <Divider />
          
          <Routes><Route exact path='/' element={
            <InfiniteScroll

              useWindow={false}
              dataLength={allProducts.length}
              next={fetchProducts}
              hasMore={true}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b> The End</b>
                </p>
              }>

              <MainFeed loadingFeed={loading} products={products} /></InfiniteScroll>} />
            <Route path='favorites' element={<FavoritesFeed loadingFeed={loading} products={myFavorites} />} />
            <Route path='shop' element={<ShopSearch
              search={search}
              sites={allSites}
              shop={shops}
              recommended={recommended.slice(0, 6)}
              searchInput={searchListener} />} >

            </Route><Route path='shop/:id' element={<CategoryPage userData={userData} shops={shops} toggle={toggleShop} />}></Route>
            <Route path='add' element={<AddShops />} />
            <Route path='follows' element={<Following follows={follows} />} /> </Routes>
        </Router>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
