
//------------Dependencies-----------

require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

//------------Definitions------------

//---------Global Variables----------

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for setting up URL handling and JSON parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setting up the static file directory in the public folder
app.use(express.static("public"));

// Setting up the engine for handlebars utilization
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setting up API and HTML routes 
// Setting up API and HTML routes 
require("./routes/apiRoutes.js") (app);
require("./routes/htmlRoutes.js")( app);

// Sync models for sequelize and initializing the server
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("We've got ears on PORT " + PORT);
    });
});

module.exports = app;
