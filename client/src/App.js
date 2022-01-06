
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './components/ProductItem';
import SiteButton from './components/UI/FilterButton';
import MenuBar from './components/UI/MenuBar';
import Feed from './components/Feed';
import ShopSearch from './components/ShopSearch';
import LazyLoad from 'react-lazyload';
import AddShop from './components/AddShop';
import RadioCard from './components/UI/RadioCard';
import {
  useToast,
  Divider
} from "@chakra-ui/react"

import { useAuth0 } from "@auth0/auth0-react";

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const allCategories = ["All","tops", "outer", "accessories", "footwear", "bottoms", "dresses", "home", "Misc"]

function App() {
  const { logout, user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState("")
  const [allProducts, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('localFavorites')) || [])
  const toast = useToast()
  const [myShops, setMyShops] = useState(JSON.parse(localStorage.getItem('localShops')) || [])
  const [categories, setCategories] = useState([])
  
  // const [userData, setUserData]= useState(isAuthenticated?[{
  //   name: user.name,
  // }]: [])


  const fetchUser = async () =>{
    let userData = await axios.get("https://calm-harbor-25651.herokuapp.com/user",{params: {name: user.name}})
    console.log(userData)
  }

  const fetchProducts = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/products")
      .then(res => {
        setProducts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
        setLoading(false);
        // let newCategories = []
        // res.data.map(shop => {
        //   if (shop.category !== undefined && shop.category !== "") {
        //     newCategories.push(shop.category)
        //   }
        // })
        // let uniqueCategories = [...new Set(newCategories)]
      }).catch(err => console.log(`Error: ${err}`));
  }

  const fetchShops = () => {
    axios.get("https://calm-harbor-25651.herokuapp.com/shops")
      .then(res => {
        if (JSON.parse(localStorage.getItem('localShops')).length === 0) {
          localStorage.setItem('localShops', JSON.stringify(res.data))
        }
        setMyShops(JSON.parse(localStorage.getItem('localShops')) || res.data)
      }).catch(err => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    if(isAuthenticated){fetchUser()} 
  }, [])

  useEffect(() => {
    fetchShops();
  }, [])

  useEffect(() => {
    localStorage.setItem('localShops', JSON.stringify(myShops))
    localStorage.setItem('localFavorites', JSON.stringify(favorites))
    setCategories(allCategories.map(category => {
      return {
        category: category,
        isActive: true
      }
    }))
  }, [favorites, myShops])


  useEffect(() => {
    fetchProducts();
  }, [myShops, categories])

  //Search bar 
  const searchListener = (event) => {
    setSearch(event.target.value)
  }

  //add/remove products from favorites
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

  //follow shops
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
  const active = myShops.filter(site => JSON.parse(site.isActive) === true).map(store => {
    return store.name
  })


  const activeCategories = categories.filter(category => JSON.parse(category.isActive) === true).map(store => {
    return store.category
  })
  //return favorites
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
          icon={myShops.find((shop) => shop.name === product.store)}
        ></ProductItem>
      </>)
  })

  //return products filtered by active filter
  const products = allProducts.filter(product => active.includes(product.store))
    .filter(product => activeCategories.includes(product.category))
    .map(product => {
      return (
       <LazyLoad key={product.id} >
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
          icon={myShops.find((shop) => shop.name === product.store)}
        ></ProductItem>
        </LazyLoad>
      )
    })

  // //return user picked sites
  // const mySites = myShops.filter(shop => JSON.parse(shop.checked) === true).map((site, index) =>
  //   <SiteButton logo={site.logo} key={index} name={site.name} isActive={site.isActive} filter={updateShops} />
  // )


  const allSites = myShops.filter(shop => shop.name.includes(search)).map(shop => {
    return (
      <>
        <RadioCard name={shop.name} url={shop.url} value={shop.name} checked={JSON.parse(shop.checked)} toggle={toggleShop} favicon={shop.favicon} />
      </>)
  })

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
