const db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({
            include: [db.Customer],
            order: [["updatedAt", "DESC"]]
        }).then(function (gotBurgers) {
            console.log("dbBurgers: " + JSON.stringify(gotBurgers));

            let burgersReady = [];
            let burgersConsumed = [];

            gotBurgers.forEach(index => {
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