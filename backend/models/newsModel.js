const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title : {
      type: String,
      required: true,
    },
    nimage: {
      type: String,
      default: null,
    },
    content : {
      type: String,
      required: true,
    },
    date : {
      type: Date,
      default: Date.now,
    },
    writer : {
      type: String,
      required: true,
    }
  });

  newsSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__V
    }
  })

  const News = mongoose.model('News', newsSchema);
  module.exports = News;