const express = require("express");
const bodyParser = require('body-parser')
const myRouter=require("./routes/route")
var cors = require("cors");
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 3001;

app.get('/',(req,res)=>{
    res.send({message:'Server is up and running!'});
})

app.use("/", myRouter);

app.use('*',(req,res)=>{
    res.status(404).send({message:'page not found'});
})

app.listen(port, () => console.log(`App listening on port ${port} !`));