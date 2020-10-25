const axios = require('axios')
const Sentiment = require('sentiment')
require('dotenv').config()

const positiveNews = (req, res) => {
    axios.get(`https://newsapi.org/v2/everything?domains=techradar.com,medicalnewstoday.com,businessinsider.com&sortBy=publishedAt&language=en&pageSize=16&apiKey=${process.env.NEWS_API_KEY}`)
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
            return result.score > 1
        })

        const positiveArticlesUnique = positiveArticles.filter((article, index) => {
            return positiveArticles.map(articleObj => articleObj.title).indexOf(article.title) === index
        })

        res.status(200).json({
            articles: positiveArticlesUnique
        })
    })
    .catch(error => {
        res.status(500).send(error);
    })
}

const allNews= (req,res)=>{
    axios.get(`https://newsapi.org/v2/top-headlines?country=in&language=en&sortBy=publishedAt&pageSize=16&apiKey=${process.env.NEWS_API_KEY}`)
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
        res.status(500).send(error);
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
            return result.score > 1
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
        res.status(500).send(error);
    })
}


module.exports={
    positiveNews,
    allNews,
    searchNews
}