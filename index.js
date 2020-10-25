const express = require("express");
const bodyParser = require('body-parser')
const myRouter=require("./routes/route")

const app = express();
const port = process.env.PORT || 3001;

app.use("/route", myRouter);

app.listen(port, () => console.log(`App listening on port ${port} !`));