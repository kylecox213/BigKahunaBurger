const db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({
        }).then(function (dbBurgers) {
            console.log("dbBurgers: " + JSON.stringify(dbBurgers));

            let burgersReady = [];
            let burgersConsumed = [];

            dbBurgers.forEach(index => {
                if (!index.consumed) {
                    burgersReady.push(index);
                }
                else {
                    burgersConsumed.push(index);
                }
            });

            res.render("index", {
                ready: burgersReady,
                consumed: burgersConsumed
            });
        });
    });


    app.get("*", function (req, res) {
        res.render("404");
    });
};