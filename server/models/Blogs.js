const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Blogs', blogSchema);