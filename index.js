const path = require('path');

const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config({ path: "./config.env" })
app.use(cors())
app.use(express.json())
app.use(require("./routes/record"))

const dbo = require('./db/conn')
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.ATLAS_URI);
const dbName = 'lets-shop';


// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...

async function run(products) {
    try {
        await client.connect();
        console.log("connected");
        const db = client.db(dbName);
        const col = db.collection("products");
        let myProducts = products
        for (const product of myProducts) {
            const check = await col.find({ "title": product.title }).count(1) >= 1
        
            if (check) {
                //col.deleteMany({"title":product.title});
                console.log('exists')
            } else {
                const p = await col.insertOne(product);
                const myDoc = await col.findOne();
                console.log(product)
            }
        }
    } catch (err) {
        console.log(err.stack)
    }
    finally {
    }
}

const tres = 'https://tres-bien.com/new-arrivals?p=1'

const uniqloMShop = "https://www.uniqlo.com/us/en/men/new-arrivals"
const uniqloWShop = "https://www.uniqlo.com/us/en/women/new-arrivals"
const zaraWNewArrivals = "https://www.zara.com/ca/en/woman-new-in-l1180.html?v1=1881787"

const kollectionNewArrivals = "https://kollektion.ca/collections/furniture-lighting/products.json"
const stussyNewArrivals = "https://www.stussy.com/collections/new-arrivals/products.json"
const havenshop = 'https://shop.havenshop.com/collections/new-arrivals/products.json'
const doverstreet = 'https://shop.doverstreetmarket.com/collections/whats-new/products.json'
const lessonseven = 'https://lessoneseven.com/collections/latest-arrivals/products.json'

const getShopifyNewArrivals = ((products_url,store) => {
    axios(products_url)
        .then(res => {
            const json = res.data.products
            const updatedUrl = products_url.replace(".json", "");

            let products = []
            json.map((item) => {
          
                const product = {
                    title: item.title,
                    url: updatedUrl + "/" + item.handle,
                    img: item.images[0].src,
                    price: item.variants[0].price,
                    store: store,
                    brand:item.vendor,
                    date: Date.now()
                }
             
                products.push(product)
            })
            run(products)
        }).catch(error => console.log('error'))
}

)

//get new arrivals tres bien
const tresbien = () => {
    axios(tres)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)

            let products = []
            $('.product-item-info', html).each(function () {
                const title = $(this).find('a').text()
                const url = $(this).find('a').attr('href')
                const img = $(this).find('img').attr('srcset')
                const price = $(this).find('.price-wrapper').attr('data-price-amount')

                const product = {
                    title,
                    url,
                    img,
                    price,
                    store: 'tres-bien',
                    date: Date.now()
                }

                products.push(product)
            })

            run(products)
        }).catch(error => console.log('error'))
}






const uniqloW = () => {
    axios(uniqloWShop)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            const products = []
            $('.product-tile', html).each(function () {
                // const title = $(this).find('a').text()
                const brand = $(this).find('a').text()
                const title = $(this).find('.link').text()
                const price = $(this).find('.value').text().trim()
                const url = "https://uniqlo.com" + $(this).find('a').attr('href')
                const img = $(this).find('.tile-image').attr('src')

                const product = {
                    brand: 'uniqlo',
                    title,
                    price,
                    url,
                    img,
                    store: 'uniqlo-womens',
                    date: Date.now()
                }
                products.push(product)
            })
            run(products)
        }).catch(error => console.log('error uniqlow'))
}



const uniqloM = () => {
    axios(uniqloMShop)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            const products = []
            $('.product-tile', html).each(function () {
                // const title = $(this).find('a').text()
                // const brand = $(this).find('a').text()
                const title = $(this).find('.link').text()
                const price = $(this).find('.value').text().trim()
                const url = "https://uniqlo.com" + $(this).find('a').attr('href')
                const img = $(this).find('.tile-image').attr('src')


                const product = {
                    brand: 'uniqlo',
                    title,
                    price,
                    url,
                    img,
                    store: 'uniqlo-mens',
                    date: Date.now()
                }
                products.push(product)
            })
            run(products)
        }).catch(error => console.log('erroruniqlom'))
}


tresbien()
uniqloW()
uniqloM()
getShopifyNewArrivals(stussyNewArrivals,"stussy");
getShopifyNewArrivals(havenshop,"haven");
getShopifyNewArrivals(kollectionNewArrivals,"kollektion")
getShopifyNewArrivals(doverstreet,"DSM")
getShopifyNewArrivals(lessonseven,"less 17")

setInterval(() => {
    tresbien()
    uniqloW()
    uniqloM()
    getShopifyNewArrivals(stussyNewArrivals,"stussy");
    getShopifyNewArrivals(havenshop,"haven");
    getShopifyNewArrivals(kollectionNewArrivals,"kollektion")
    getShopifyNewArrivals(doverstreet,"DSM")
    getShopifyNewArrivals(lessonseven, "less 17")
}, 10000 * 60 * 60);

// ... other imports 



// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "client", "index.html"));
});

const host = '0.0.0.0';
const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`server running on PORT ${port}`)
    dbo.connectToServer(function (err) {
        if (err) console.log(err)
    })
})
