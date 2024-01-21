const News = require('../models/newsModel')

const getAllNews = (req, res, next) => {
    News.find()
        .then(news => res.json({
          success: true,
          count: news.length,
          data: news,
        }))
        .catch(next)
}

const addNews = (req, res, next) => {
    News.create(req.body)
        .then((news) => res.status(201).json(news))
        .catch(err => next(err))
}

const deleteNews = (req, res, next) => {
    News.deleteMany()
        .then(reply => res.json(reply))
        .catch(next)
}

const getNewsbyId = (req,res,next) => {
    const newsid = req.params.news_id;

    News.findById(newsid)
        .then((news) => {
          if (!news) {
              return res.status(404).json({ error: 'News not found' });
          }
          res.json(news);
        })
        .catch(next);
}

const editANews = (req, res, next) => {
    const newsid = req.params.news_id;
    const changes= req.body;
  
    News.findByIdAndUpdate(
        newsid ,
        changes,
        { new: true }
    )
      .then((news) => {
        if (!news) {
          return res.status(404).json({ error: 'News not found' });
        }
        res.json(news);
      })
      .catch(next);
}

const deleteANews = (req, res, next) => {
    const newsid = req.params.news_id;

    News.findByIdAndDelete(newsid)
      .then((deletedNews) => {
        if (!deletedNews) {
          return res.status(404).json({ error: 'News not found' });
        }
        res.json({ message: 'News deleted successfully' });
      })
      .catch(next);
}

const newsImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a file" });
  }
  News.findByIdAndUpdate(
    req.params.news_id,
    { nimage: req.file.filename },
    { new: true }
  )
    .then((news) => {
      res.status(200).json({
        success: true,
        data: req.file.filename,
        news: news,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {
    getAllNews,
    addNews,
    deleteNews,
    getNewsbyId,
    editANews,
    deleteANews,
    newsImage
}