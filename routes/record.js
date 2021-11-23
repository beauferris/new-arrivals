const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");


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


module.exports = recordRoutes