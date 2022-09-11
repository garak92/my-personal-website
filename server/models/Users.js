const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    default: 'admin'
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Users', usersSchema);