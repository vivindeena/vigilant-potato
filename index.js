require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGODB_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb Connected ......')
  })
  .catch((err) => {
    console.log('Error:', err)
  })

// app.use()

PORT 
app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
})