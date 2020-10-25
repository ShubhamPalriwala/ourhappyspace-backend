const express = require("express");
const router = new express.Router();
const { searchNews, positiveNews, allNews } =require("../controllers/controller");

router.get("/positivenews",positiveNews);
router.get("/allnews",allNews);
router.post("/search",searchNews);

module.exports = router;