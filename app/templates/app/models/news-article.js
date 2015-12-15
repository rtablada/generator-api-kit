var mongoose = require('mongoose');
var moment = require('moment');

var NewsArticleSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  publishDate: {type: Date, default: Date.now},
});

NewsArticleSchema.virtual('short').get(function() {
  return this.body.split(/\s+/).slice(0, 5).join(' ');
});

NewsArticleSchema.virtual('publishDateFormatted').get(function() {
  return moment(this.publishDate).format('L');
});

NewsArticleSchema.virtual('publishDateForm').get(function() {
  return moment(this.publishDate).format('YYYY-MM-DD');
});

module.exports = mongoose.model('NewsArticle', NewsArticleSchema);
