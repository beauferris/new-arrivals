
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './components/ProductItem';
import SiteButton from './components/UI/FilterButton';
import MenuBar from './components/UI/MenuBar';
import Feed from './components/Feed';
import ShopSearch from './components/ShopSearch';

import AddShop from './components/AddShop';
import RadioCard from './components/UI/RadioCard';
import {
  // useToast,
  Divider
} from "@chakra-ui/react"


import { useAuth0 } from "@auth0/auth0-react";

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//const allCategories = ["All", "tops", "outer", "accessories", "footwear", "bottoms", "dresses", "home", "Misc"]

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState("")
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  // const toast = useToast()
  const [myShops, setMyShops] = useState([])
  const [categories, setCategories] = useState([])

  // const [userData, setUserData]= useState(isAuthenticated?[{
  //   name: user.name,
  // }]: [])

  const [userData, setUserData] = useState([])

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
    axios.post("http://localhost:5001/update", userData)
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
  //   localStorage.setItem('localShops', JSON.stringify(myShops))
  //   localStorage.setItem('localFavorites', JSON.stringify(favorites))
  //   setCategories(allCategories.map(category => {
  //     return {
  //       category: category,
  //       isActive: true
  //     }
  //   }))
  // }, [favorites, myShops])

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
      favorites = [...favorites, event.currentTarget.value]
    }

    setUserData({
      ...userData,
      favorites: favorites
    })



    // const value = event.currentTarget.value;
    // const newFavs = [...favorites]
    // const index = allProducts.findIndex(index => index.title === value)
    // const product = allProducts[index]
    // console.log(product)
    // const check = newFavs.some(check => {
    //   return check.title === value
    // })
    // if (check) {
    //   const indexFav = newFavs.findIndex(fav => fav.title === value)
    //   newFavs.splice(indexFav, 1)
    // } else {
    //   newFavs.push(product);
    // }
    // setFavorites(newFavs)
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

    // setMyShops(myShops =>
    //   myShops.map((shop) =>
    //     shop.name === event.currentTarget.value
    //       ? {
    //         ...shop,
    //         checked: !JSON.parse(shop.checked),
    //         isActive: !JSON.parse(shop.checked)
    //       } : shop
    //   )
    // )

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

  // //filter shops
  // const updateShops = (event) => {
  //   setLoading(true)
  //   const index = myShops.findIndex(site => site.name === event.target.value);
  //   const filterShopsCopy = [...myShops];
  //   filterShopsCopy[index].isActive = !JSON.parse(filterShopsCopy[index].isActive);
  //   setMyShops(filterShopsCopy)
  // }

  const updateCategories = async (event) => {
    setLoading(true)

    const index = categories.findIndex(category => category.category === event.target.value);
    const filterCategoriesCopy = [...categories];

    if (filterCategoriesCopy[index].category === 'All') {
      if (!filterCategoriesCopy[index].isActive) {
        filterCategoriesCopy.map(category => {
          category.isActive = true
        })
      } else {
        filterCategoriesCopy.map(category => {
          category.isActive = false;
        })
      }
    } else {
      filterCategoriesCopy[0].isActive = false
      filterCategoriesCopy[index].isActive = !filterCategoriesCopy[index].isActive;

    }
    setCategories(filterCategoriesCopy)
  }

  const myCategories = categories.map((category, index) => {
    return (
      <SiteButton key={index} value={category.category} name={category.category} isActive={category.isActive} filter={updateCategories} />
    )
  });

  //return shops user is following
  const active = userData ? myShops.filter(site => userData.shops?.includes(site.name)).map(store => {
    return (store.name)
  }) : " "



  // const activeCategories = categories.filter(category => JSON.parse(category.isActive) === true).map(store => {
  //   return store.category
  // })

  //return favorites
  const myFavorites = userData ?
    allProducts.filter(product => userData.favorites.includes(product.id.toString())).map((product, index) => {
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
    }) : ""

  const allSites = userData ?
    myShops.filter(shop => shop.name.includes(search)).map(shop => {
      return (<RadioCard
        name={shop.name}
        url={shop.url}
        value={shop.name}
        checked={userData.shops.includes(shop.name)}
        toggle={toggleShop}
        favicon={shop.favicon} />)
    }) : " "

  //return products filtered by active filter
  const products = allProducts.filter(product => active.includes(product.store))
    // .filter(product => activeCategories.includes(product.category))
    .map(product => {

      return (
       
          <ProductItem
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
          ></ProductItem>
       
      )
    })

  // //return user picked sites
  // const mySites = myShops.filter(shop => JSON.parse(shop.checked) === true).map((site, index) =>
  //   <SiteButton logo={site.logo} key={index} name={site.name} isActive={site.isActive} filter={updateShops} />
  // )

  return (
    <div className="App">
      <Router>
        <MenuBar />
        <Divider />
        <Routes>
          <Route exact path='/' element={<Feed loading={loading} mySites={myCategories} products={products} />} />
          <Route path='shop' element={<ShopSearch search={search} sites={allSites} searchInput={searchListener} />} />
          <Route path='favorites' element={<Feed products={myFavorites} />} />
          <Route path='add' element={<AddShop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
