const path = require('path');

const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")

const app = express()
app.use(express.urlencoded({ extended: true }));

const cors = require("cors")
require("dotenv").config({ path: "./config.env" })
app.use(cors())
app.use(express.json())
app.use(require("./routes/record"))

const dbo = require('./db/conn')
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.ATLAS_URI);

const dbName = 'lets-shop';
// app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.static(path.join(__dirname, "client")))

const outer = ["Jackets", "Coats", "Coats, Jackets and Vests",
    "Mens Long Sleeve Jacket", "outer", "Outer", "Outerwear", "Jacket", "Outerwear - Jackets","Outerwear Mens"]

const tops = ["Apparel","Sweatshirt", "Tee Shirt", "shirt", "Vests","T-Shirts Mens",
    "MENS HOODIE",
    "Clothing", "Tops - Short Sleeve T-Shirts", "T SHIRT",
    "Sweatshirts", "Tees", "t-shirt", "hoodie", "sweater", "vest", "cardigan", "Tees and Sweats", "Mens Short Sleeve T-Shirt",
    "Mens Long Sleeve Sweatshirt", "Mens Long Sleeve T-Shirt", "tops", "Tops - Crewnecks", "Tops - Long Sleeve T-Shirts", "Tops - Hoodies", "Tops - Sweaters",
    "Tops - Long Sleeve Button Downs", "Tops", "Knitwear",
    "Mens Long Sleeve Polo/Rugby", "Shirts", "Sweaters", "T-Shirts", "T-shirts", "Knits", "Shirt", "Mens Short Sleeve Knit", "Fleece"]

const bottoms = ["Pants Mens", "Bottoms - Chinos", "Pant", "Sweatpants", "Denim Jeans", "Trousers", "Bottoms", "Bottoms - Denim", "Bottoms - Joggers and Sweatpants", "bottoms", "Mens Pant", "Denim", "Pants", "pant",]
 const footwear = ["Footwear - Sneakers", "Sneakers", "Footwear", "Shoes and Boots","Lace Ups Mens"]
const accessories = ["Jewelry Mens","Gloves Mens",
    "Accessories - Wallets and Keychains", "Deodorant", "Hats", "Hat", "Bags", "Accessories", "Headwear", "Accessories - Bags - Duffles", "Accessories - Bags - Totes", "Accessories - Bags - Backpacks", "Accessories - Headwear - Beanies", "Accessories - Headwear - Caps",
    "Accessories Beanie", "Mens Brief", "other", "Misc.", "food", "hat", "Gift Cards",]

const home = ["Tarps","Tarps","Cups & Mugs","Chairs","Poles & Accessories","Containers & Coolers","Iron Grill Table","Tents","Tables","Candles", "Lifestyle - Homeware - Blankets", "Accessories Novelty Home", "Apothecary", "kitchen", "incense", "ceramic", "Candle", "Bath Bomb", "Hand Sanitizer", "Gift Set", "Bubble Bath", "Body Lotion", "Bar Soap", "Hand Cream"]

const dresses = ["Dresses", "dress", "Dress", "dresses", "skirt"]

const jewelry = ["rings","necklace","ring","necklaces"]


async function run(products) {
    try {
        await client.connect();
        //console.log("connected");
        const db = client.db(dbName);
        const col = db.collection("products");
        let myProducts = products
        for (const product of myProducts) {
            const check = await col.find({ "id": product.id }).count(1) >= 1

            if (check) {
                //col.deleteMany({"title":product.title});
                //console.log('exists')
            } else {
                const p = await col.insertOne(product);
                const myDoc = await col.findOne();
               // console.log(product)
            }
        }
    } catch (err) {
        console.log(err.stack)
    }
    finally {
    }
}



const getShopifyNewArrivals = ((products_url, store) => {
    axios(products_url)
        .then(res => {
            const json = res.data.products
            const updatedUrl = products_url.replace(".json", "");

            let category = "";

            let products = []
            json.forEach((item) => {
                if (outer.includes(item.product_type)) {
                    category = "outer"
                } else if (tops.includes(item.product_type)) {
                    category = "tops"
                } else if (bottoms.includes(item.product_type)) {
                    category = "bottoms"
                } else if (footwear.includes(item.product_type)) {
                    category = "footwear"
                } else if (accessories.includes(item.product_type)) {
                    category = "accessories"
                } else if (home.includes(item.product_type)) {
                    category = "home"
                } else if (dresses.includes(item.product_type.toLowerCase())) {
                    category = "dresses"
                } else {
                    //console.log(item.product_type)
                    category = "Misc"
                }

                const product = {
                    id: item.variants[0].id,
                    title: item.title,
                    url: updatedUrl + "/" + item.handle,
                    img: item.images[0].src,
                    price: item.variants[0].price,
                    store: store,
                    brand: item.vendor,
                    date: Date.now(),
                    category: category,
                    tag: item.product_type
                }
                products.push(product)
            })
            run(products)
        }).catch(error => {
            return error
        })
})

async function shops() {
    try {
        await client.connect();
        console.log("Getting shops");
        const db = client.db(dbName);
        const col = db.collection("shops");

        col.find().forEach(shop => {
            //console.log(shop.url)
            getShopifyNewArrivals(shop.url, shop.name);
        })
    } catch (err) {
        console.log(err.stack)
    } finally {
    }
}

exports.new_arrivals = getShopifyNewArrivals;

shops()

setInterval(() => {
    shops()
}, 10000 * 60 * 60)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/index.html"));
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`server running on PORT ${port}`)
    dbo.connectToServer(function (err) {
        if (err) console.log(err)
    })
})
