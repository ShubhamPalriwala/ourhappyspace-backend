const axios = require('axios')
const Sentiment = require('sentiment')
require('dotenv').config()

const positiveNews = (req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?language=in&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`)
    .then(response => {
        const sentiment = new Sentiment()
        
        const positiveArticles = response.data.articles.filter(article => {
            for (let field in article) {
                if (field === 'title' && article[field] === null ||
                    field === 'description' && article[field] === null ||
                    field === 'url' && article[field] === null ||
                    field === 'urlToImage' && article[field] === null
                ) {
                    return false
                }
            }

            const content = article.title + " " + article.description
            const result = sentiment.analyze(content)
            return result.score > 1.2
        })

        const positiveArticlesUnique = positiveArticles.filter((article, index) => {
            return positiveArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        res.status(200).json({
            articles: positiveArticlesUnique
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Server Error");
    })
}

const allNews= (req,res)=>{
    axios.get(`https://newsapi.org/v2/top-headlines?language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`)
    .then(response => {
        
        const allArticles = response.data.articles.filter(article => {
            for (let field in article) {
                if (field === 'title' && article[field] === null ||
                    field === 'description' && article[field] === null ||
                    field === 'url' && article[field] === null ||
                    field === 'urlToImage' && article[field] === null
                ) {
                    return false
                }
            }

            const content = article.title + " " + article.description
            return content
        })

        const uniqueArticles = allArticles.filter((article, index) => {
            return allArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        res.status(200).json({
            articles: uniqueArticles
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Server Error");
    })
};

const searchNews = (req, res) => {
    const topic=req.body.topic;
    axios.get('https://newsapi.org/v2/everything?q='+topic+'&sortBy=publishedAt&language=en&apiKey='+process.env.NEWS_API_KEY)
    .then(response => {
        const sentiment = new Sentiment()
        
        const positiveArticles = response.data.articles.filter(article => {
            for (let field in article) {
                if (field === 'title' && article[field] === null ||
                    field === 'description' && article[field] === null ||
                    field === 'url' && article[field] === null ||
                    field === 'urlToImage' && article[field] === null
                ) {
                    return false
                }
            }

            const content = article.title + " " + article.description
            const result = sentiment.analyze(content)
            return result.score > 1.3
        })

        const positiveArticlesUnique = positiveArticles.filter((article, index) => {
            return positiveArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        const allArticles = response.data.articles.filter(article => {
            for (let field in article) {
                if (field === 'title' && article[field] === null ||
                    field === 'description' && article[field] === null ||
                    field === 'url' && article[field] === null ||
                    field === 'urlToImage' && article[field] === null
                ) {
                    return false
                }
            }

            const content = article.title + " " + article.description
            return content
        })

        const uniqueArticles = allArticles.filter((article, index) => {
            return allArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        

        res.status(200).json({
            positive: positiveArticlesUnique,
            all: uniqueArticles
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Server Error");
    })
}


module.exports={
    positiveNews,
    allNews,
    searchNews
}