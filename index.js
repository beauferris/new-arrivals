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
app.use(express.static(path.join(__dirname, "client", "build")))

async function run(products) {
    try {
        await client.connect();
        console.log("connected");
        const db = client.db(dbName);
        const col = db.collection("products");
        let myProducts = products
        for (const product of myProducts) {
            const check = await col.find({ "id": product.id }).count(1) >= 1

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


const getShopifyNewArrivals = ((products_url, store) => {
    axios(products_url)
        .then(res => {
            const json = res.data.products
            const updatedUrl = products_url.replace(".json", "");

            let products = []
            json.map((item) => {
                const product = {
                    id: item.variants[0].id,
                    title: item.title,
                    url: updatedUrl + "/" + item.handle,
                    img: item.images[0].src,
                    price: item.variants[0].price,
                    store: store,
                    brand: item.vendor,
                    date: Date.now()
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
            console.log(shop.url)
            getShopifyNewArrivals(shop.url, shop.name);
        })
    } catch (err) {
        console.log(err.stack)
    } finally {
    }
}

exports.new_arrivals = getShopifyNewArrivals;

shops()

setInterval(()=>{
    shops()
},10000 * 60 * 60)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "client", "index.html"));

});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server running on PORT ${port}`)
    dbo.connectToServer(function (err) {
        if (err) console.log(err)
    })
})
