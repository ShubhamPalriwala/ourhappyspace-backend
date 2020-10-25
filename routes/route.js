const express = require("express");
const router = new express.Router();
const { hello, searchNews, topNews } =require("../controllers/controller");

router.get("/",hello);
router.get("/topnews",topNews);
router.post("/search",searchNews);

module.exports = router;