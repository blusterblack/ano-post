const mongoose = require('mongoose');

const Post = mongoose.Schema({
  user: String,
  content: String,
  date: Date,
});
module.exports = mongoose.model('Post', Post);
