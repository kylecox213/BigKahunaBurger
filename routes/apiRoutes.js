const db = require("../models");

module.exports = function (app) {
    app.get("/api/burgers", function (req, res) {
        console.log("burgers");
        db.Burger.findAll({
        }).then(function (dbBurgers) {
            res.json(dbBurgers);
        });
    });

    app.post("/api/burgers/create", function (req, res) {
        db.Burger.create(req.body).then(function () {
            res.send(true);
        });
    });

    app.put("/api/burgers/update/:burgerId", function (req, res) {
        db.Burger.update(
            { consumed: true },
            {
                where: { id: req.params.burgerId }
            }).then(function () {
                res.send(true);
            });
    });
};