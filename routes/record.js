const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const cheerio = require('cheerio');

const axios = require("axios")

// This section will help you get a list of all the records.
recordRoutes.route("/shops").get(function (req, res) {
    let db_connect = dbo.getDb("lets-shop");

    db_connect
        .collection("shops")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/products").get(function (req, res) {
    let db_connect = dbo.getDb("lets-shop");

    db_connect
        .collection("products")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/create").post(async (req, res, next) => {
    let shops = require("../index.js")
    let db_connect = dbo.getDb("lets-shop");
    
    

    const getFavicon = (url) =>{
        axios(url)
        .then(res => {
            const html = res.data
            const $ = cheerio.load(html)
            $('link', html).each(function () {
                
                if($(this).attr('rel')==='icon'){
                   return ($(this).attr('href'))
                }
            })
        })
    }
    
   
    let shop = {
        url: req.body.url,
        name: req.body.name,
        checked: "false",
        isActive: "false",
        favicon: getFavicon(req.body.name)
    }

    const checkJSON = async (products_url) => {
        let resp = await axios(products_url)
        if (typeof resp.data !== "object") {
            res.send("incorrect format")
        } else {
            const check = await db_connect.collection("shops").find({ "name": req.body.name }).count(1) >= 1
            if (check) {
                res.send('store already exists')
            } else {
                db_connect.collection("shops")
                    .insertOne(shop, (err, result) => {
                        if (err) throw err
                    })
                res.send(shop.name+"Added")
                shops.new_arrivals(shop.url,shop.name)   
            }
        }
    }

    checkJSON(req.body.url)
})

module.exports = recordRoutes