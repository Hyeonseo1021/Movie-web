const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9]{1,15}$/,
    maxlength: 30
  },

  nickname: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 8
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
