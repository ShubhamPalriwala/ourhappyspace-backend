const express = require("express");
const router = new express.Router();
const { hello } =require("../controllers/controller");

router.get("/",hello);


module.exports = router;