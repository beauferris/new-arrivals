import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsContext from './context/products-context';

//import UI components
import SiteButton from './components/UI/FilterButton';
import MenuBar from './components/UI/MenuBar';
import ShopCard from './components/UI/ShopCard';
import ProductItem from './components/ProductItem';

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

const allCategories = ["All", "tops", "outer", "accessories", "footwear", "bottoms", "dresses", "home", "Misc"]

function App() {
  const { user, isAuthenticated } = useAuth0();

  const [search, setSearch] = useState("")

  const [userData, setUserData] = useState([])
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [myShops, setMyShops] = useState([])
  const [categories, setCategories] = useState([])
 

  const fetchUser = async () => {
    try {
      let ud = isAuthenticated ? await axios.get("http://localhost:5001/user", { params: { email: user.email } }) : ""
      setUserData(ud.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProducts = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/products")
      .then(res => {
        setProducts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
        setLoading(false)
      }).catch(err => console.log(`Error: ${err}`));
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

  useEffect(() => {
    setCategories(allCategories.map(category => {
      return {
        category: category,
        isActive: true
      }
    }))
  }, [])

  useEffect(() => {
    fetchProducts();
  }, [myShops, categories])

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

  // const updateCategories = async (event) => {
  //   setLoading(true)

  //   const index = categories.findIndex(category => category.category === event.target.value);
  //   const filterCategoriesCopy = [...categories];

  //   if (filterCategoriesCopy[index].category === 'All') {
  //     if (!filterCategoriesCopy[index].isActive) {
  //       filterCategoriesCopy.map(category => {
  //         category.isActive = true
  //       })
  //     } else {
  //       filterCategoriesCopy.map(category => {
  //         category.isActive = false;
  //       })
  //     }
  //   } else {
  //     filterCategoriesCopy[0].isActive = false
  //     filterCategoriesCopy[index].isActive = !filterCategoriesCopy[index].isActive;

  //   }
  //   setCategories(filterCategoriesCopy)
  // }

  // const myCategories = categories.map((category, index) => {
  //   return (
  //     <SiteButton key={index} value={category.category} name={category.category} isActive={category.isActive} filter={updateCategories} />
  //   )
  // });

  //return shops user is following
  const active = userData ? myShops.filter(site => userData.shops?.includes(site.name)).map(store => {
    return (store.name)
  }) : " "

  // const activeCategories = categories.filter(category => JSON.parse(category.isActive) === true).map(store => {
  //   return store.category
  // })



  const allSites = search === ""? "":
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
  const products = isAuthenticated?  allProducts.filter(product => active.includes(product.store))
    //.filter(product => activeCategories.includes(product.category))
    .map(product => {
      return (
        <LazyLoad offset={500} placeholder={<Skeleton mb={1} height={500} />}>
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
        </LazyLoad>
      )
    }) : allProducts.map((product, index) => {
      return (
        <LazyLoad offset={500} placeholder={<Skeleton mb={1} height={500} />}>
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
          <MenuBar />
          <Divider />

          <Routes><Route exact path='/' element={<MainFeed products={products} />} />
            <Route path='favorites' element={<FavoritesFeed products={myFavorites} />} />
            <Route path='shop' element={<ShopSearch
              search={search}
              sites={allSites}
              recommended={recommended.slice(0, 6)}
              searchInput={searchListener} />} />
            <Route path='add' element={<AddShops />} />
            <Route path='follows' element={<Following follows={follows} />} /> </Routes> 
        </Router>
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
