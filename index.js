const express = require("express");
const bodyParser = require('body-parser')
const myRouter=require("./routes/route")
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 3001;

app.use("/route", myRouter);

app.listen(port, () => console.log(`App listening on port ${port} !`));