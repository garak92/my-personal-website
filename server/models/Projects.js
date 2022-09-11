const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Projects', projectsSchema);