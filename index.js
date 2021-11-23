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
            const check = await col.find({ "title": product.title }).count(1)>=1

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
const havenshop = 'https://shop.havenshop.com/collections/new-arrivals?_ga=2.30736250.417986787.1636579339-1557637853.1636579339&_gac=1.249935476.1636579339.Cj0KCQiA-K2MBhC-ARIsAMtLKRsvbAl-In918UUCtNohqLcJPkKaea6ToMm5Thk_s9YJOhMyZEZc67oaAsEFEALw_wcB'
const uniqloMShop = "https://www.uniqlo.com/us/en/men/new-arrivals"
const uniqloWShop = "https://www.uniqlo.com/us/en/women/new-arrivals"
const zaraWNewArrivals = "https://www.zara.com/ca/en/woman-new-in-l1180.html?v1=1881787"

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




//get new arrivals haven shop
const haven = () =>{axios(havenshop)
    .then(res => {
        const html = res.data
        const $ = cheerio.load(html)
        const products = []
        $('.shop-products a', html).each(function () {
            // const title = $(this).find('a').text()
            const brand = $(this).find('.product-card-brand').text()
            const title = $(this).find('.product-card-name').text()
            const price = $(this).find('.product-price').text().trim()
            const url = $(this).attr('href')
            const img = $(this).find('.product-image-wrapper').find('img').attr('srcset')

            const product = {
                brand,
                title,
                price,
                url,
                img,
                store: 'haven',
                date: Date.now()
            }
            products.push(product)
        })
        run(products)
    }).catch(error => console.log('error'))
}



const uniqloW = () =>{axios(uniqloWShop)
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



const uniqloM = () =>{axios(uniqloMShop)
    .then(res => {
        const html = res.data
        const $ = cheerio.load(html)
        const products=[]
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

const zaraW = () =>{axios(zaraWNewArrivals)
    .then(res => {
        const html = res.data
        const $ = cheerio.load(html)
        const products=[]
        $('.product-grid-product', html).each(function () {
           
            // const title = $(this).find('a').text()
            // const brand = $(this).find('a').text()
            const title = $(this).find('.link').text()
            const price = $(this).find('.price__amount-current').text().trim()
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')


            const product = {
                brand: 'zara',
                title,
                price,
                url,
                img,
                store: 'zara-womens',
                date: Date.now()
            }
            
            products.push(product)
            console.log(product)
        })
         //run(products)
    }).catch(error => console.log('errorunzaraw'))
}


tresbien()
haven()
uniqloW()
uniqloM()


setInterval(() => {
    tresbien()
    haven()
    uniqloW()
    uniqloM()
}, 10000*60*60 ); 

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
