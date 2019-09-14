const db = require("../models");

module.exports = function (app) {
    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({
            include: [db.Customer],
            order: [["updatedAt", "DESC"]]
        }).then(function (dbBurgers) {
            res.json(dbBurgers);
        });
    });

    app.post("/api/burgers/create", function (req, res) {
        db.Burger.create(req.body).then(function () {
            res.send(true);
        });
    });

    app.post("/api/customers/create", function (req, res) {
        db.Customer.create(req.body).then(function (newCustomer) {
            res.json(newCustomer);
        });
    });

    app.put("/api/burgers/update/:burgerId/customer/:customerId", function (req, res) {
        db.Burger.update(
            {
                consumed: true,
                CustomerId: req.params.customerId
            },
            {
                where: { id: req.params.burgerId }
            }).then(function () {
                res.send(true);
            });
    });
};