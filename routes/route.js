const express = require("express");
const router = new express.Router();
const { hello, searchNews, positiveNews, allNews } =require("../controllers/controller");

router.get("/",hello);
router.get("/positivenews",positiveNews);
router.get("/allnews",allNews);
router.post("/search",searchNews);

module.exports = router;