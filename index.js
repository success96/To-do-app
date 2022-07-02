const express = require("express");
const { json } = require("express");
require("dotenv").config() // allows us to use the environment variables in .env
const bodyParser = require("body-parser");
const routes = require("./routes/todoRoutes");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}`)
});

app.use('/', routes);
