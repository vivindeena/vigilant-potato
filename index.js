require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const books = require('./routes/books')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_DB_URI)
  .then(() => {
    console.log('MongoDb Connected ......')
  })
  .catch((err) => {
    console.log('Error:', err)
  })

app.use('/books',books)

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})