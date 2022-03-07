const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const cheerio = require('cheerio');
const axios = require("axios")

//get all shops
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
//get all products
recordRoutes.route("/products").get(function (req, res) {
    let db_connect = dbo.getDb("lets-shop");

    db_connect
        .collection("products")
        .find({ store: { $in: Object.values(req.query.shops) } })
        .skip(parseInt(req.query.skip))
        .limit(6)
        .sort({_id:-1})
        .toArray(function (err, result) {
            if (err) throw err;
            db_connect
                .collection("products")
                .find({ store: { $in: Object.values(req.query.shops) } })
                .count((err, count) => res.json({ count: count, result: result }));
        })
});

//get user data
recordRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getDb("lets-shop");

    db_connect
        .collection("users")
        .findOne({ email: req.query.email }, (err, user) => {
            if (err) throw err;
            if (!user) {
                db_connect
                    .collection("users")
                    .insertOne({
                        email: req.query.email,
                        shops: [],
                        favorites: []
                    })
                res.json(({
                    email: req.query.email,
                    shops: [],
                    favorites: []
                }))
            } else {
                res.json(user)
            }
        });
});
//update user data
recordRoutes.route("/update").post((req, res,) => {
    let db_connect = dbo.getDb("lets-shop");
    let user = req.body

    db_connect
        .collection("users")
        .updateOne({
            email: user.email
        }, {
            $set: {
                email: user.email,
                shops: user.shops,
                favorites: user.favorites
            }
        }, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
})
//add shops
recordRoutes.route("/create").post(async (req, res) => {
    let shops = require("../index.js")
    let db_connect = dbo.getDb("lets-shop");


    let shop = {
        url: req.body.url,
        name: req.body.name,
        checked: "false",
        isActive: "false",
        favicon: " ",
        search: []
    }

    const getFavicon = (url) => {
        axios(url)
            .then(res => {
                const html = res.data
                const $ = cheerio.load(html)

                $('link', html).each(function () {
                    if ($(this).attr('rel') === 'apple-touch-icon' ||
                        $(this).attr('rel') === 'icon' ||
                        $(this).attr('rel') === 'shortcut icon') {

                        shop.favicon = $(this).attr('href')
                        console.log($(this).attr('href'))
                    }
                })

            }).catch(error => console.log('erroruniqlom'))
    }


    const checkJSON = async (products_url) => {
        getFavicon("https://" + shop.name)
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
                res.send(shop.name + "Added")
                shops.new_arrivals(shop.url, shop.name)
            }
        }
    }

    checkJSON(req.body.url)
})

module.exports = recordRoutes