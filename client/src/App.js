import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsContext from './context/products-context';
import CategoryPage from './components/CategoryPage';

//import UI components
import MenuBar from './components/UI/MenuBar';
import ShopCard from './components/UI/ShopCard';
import ProductItem from './components/ProductItem';

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
import LazyLoad from 'react-lazyload';

import { Divider, Skeleton } from "@chakra-ui/react"
import { HashRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [search, setSearch] = useState("")

  const [userData, setUserData] = useState([])
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [myShops, setMyShops] = useState([])
  const [skip, setSkip] = useState(0)
  const [max, setMax] = useState(0)


  const fetchUser = async () => {
    try {
      let ud = isAuthenticated ? await axios.get("https://calm-harbor-25651.herokuapp.com/user",
        { params: { email: user.email } }) : ""
      setUserData(ud.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProducts = async () => {

    try {
      let res = userData ? await axios.get("http://localhost:5001/products", {
        params: { skip: skip, shops: userData?.shops },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      }) : ''

      const copy = [...allProducts]
      console.log(res.data.count)
      setMax(res.data.count)

      setProducts(prevState => {
        console.log(prevState)
        return (
          [...new Set([...allProducts, ...res.data.result])]
        )

      }

      )

      setSkip(skip + 3)

    } catch (err) {
      console.log(err)
    }
  }

  const fetchShops = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/shops")
      .then(res => {
        setMyShops(res.data)
      }).catch(err => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    axios.post("https://calm-harbor-25651.herokuapp.com/update", userData)
      .then(res => {
        console.log(res)
      }).catch(err => {
        if (err) throw err
      })
  }, [userData])

  useEffect(() => {
    fetchUser()
  }, [isAuthenticated])

  useEffect(() => {
    fetchShops();
  }, [userData, isAuthenticated])

  // useEffect(() => {
  //   setSkip(0);
  //   fetchProducts();
  // }, [myShops])

  //Search bar 
  const searchListener = (event) => {
    setSearch(event.target.value)
  }

  //add/remove products from favorites
  const favoriteItem = (event) => {
    let favorites = [...userData.favorites]
    let value = event.currentTarget.value
    console.log(value)

    if (favorites.includes(event.currentTarget.value)) {
      let index = favorites.indexOf(event.currentTarget.value)
      favorites.splice(index, 1)
    } else {
      favorites = [event.currentTarget.value, ...favorites]
    }

    setUserData({
      ...userData,
      favorites: favorites
    })
  }

  //follow shops
  const toggleShop = (event) => {
    let shops = [...userData.shops]

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
    myShops.filter(shop => shop.search?.some(item => item.includes(search))).map(shop => {
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
    allProducts.filter(product => userData?.favorites.includes(product.id.toString())).map((product, index) => {
      return (<ProductItem
        identifier={product.id}
        key={product.id}
        loading={loading}
        toggleFavorite={favoriteItem}
        store={product.store}
        url={product.url}
        img={product.img}
        brand={product.brand}
        title={product.title}
        price={product.price}
        isFavorite={userData.favorites.includes(product.id.toString())}
        icon={myShops.find((shop) => shop.name === product.store)}
      ></ProductItem>)
    })

  const follows =
    myShops.filter(shop => userData?.shops?.includes(shop.name)).map(shop => {
      return (<ShopCard
        key={shop._id}
        name={shop.name}
        url={shop.url}
        value={shop.name}
        checked={userData.shops?.includes(shop.name)}
        toggle={toggleShop}
        favicon={shop.favicon} />)
    })

  const recommended =
    myShops.map(shop => {
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
  const products = isAuthenticated || isLoading ? allProducts
    //.filter(product => activeCategories.includes(product.category))
    .map(product => {
      return (
        <ProductItem
          identifier={product.id}
          key={product._id}
          loading={loading}
          toggleFavorite={favoriteItem}
          store={product.store}
          url={product.url}
          img={product.img}
          brand={product.brand}
          title={product.title}
          price={product.price}
          isFavorite={userData.favorites.includes(product.id.toString())}
          icon={myShops.find((shop) => shop.name === product.store)}
        ></ProductItem>
      )
    }) : allProducts.map((product, index) => {
      return (
        <LazyLoad offset={250} placeholder={<Skeleton mb={1} height={500} />}>
          <ProductItem
            identifier={product.id}
            key={product.id}
            loading={loading}
            toggleFavorite={undefined}
            store={product.store}
            url={product.url}
            img={product.img}
            brand={product.brand}
            title={product.title}
            price={product.price}
            isFavorite={false}
            icon={myShops.find((shop) => shop.name === product.store)}
          ></ProductItem></LazyLoad>)
    })

  return (
    <ProductsContext.Provider value={{ msg: "Feed" }}>
      <div className="App">
        <Router>
          <MenuBar loading={loading} />
          <Divider />

          <Routes><Route exact path='/' element={
            <InfiniteScroll
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
            dataLength={allProducts.length} //This is important field to render the next data
            next={fetchProducts}
            hasMore={skip<=max}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>

              <MainFeed loadingFeed={loading} products={products} /></InfiniteScroll>} />
            <Route path='favorites' element={<FavoritesFeed loadingFeed={loading} products={myFavorites} />} />
            <Route path='shop' element={<ShopSearch
              search={search}
              sites={allSites}
              shop={myShops}
              recommended={recommended.slice(0, 6)}
              searchInput={searchListener} />} >

            </Route><Route path='shop/:id' element={<CategoryPage userData={userData} shops={myShops} toggle={toggleShop} />}></Route>
            <Route path='add' element={<AddShops />} />
            <Route path='follows' element={<Following follows={follows} />} /> </Routes>
        </Router>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
