const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false 
  },
  hits: {
    type: Number,
    default: 0
  }
});

const Book = mongoose.model("Books", BookSchema);

module.exports = Book;
