const mongoose = require('mongoose');
const student = require('./models/student');
const router = require("./controllers/studentcontroller")

const express = require('express');
//const student = require('./models/student');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from node api updated')
})

mongoose.connect('mongodb+srv://aditikatale0133:p2hO4a6SPhEJ51jH@cluster0.qatijnh.mongodb.net/crud-api?retryWrites=true&w=majority&appName=Cluster0')
    .then(() =>
        console.log('Connected!')
)
.catch (() => {
      console.log("not connected")  
    })

app.listen(3000, () => {
    console.log('server is running')
})


app.use('/',router)