require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path')
const app = express();
const special = require('./routes/special');
const shoes = require('./routes/shoes');
const request = require('./routes/requests');
const user = require('./routes/register');

mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true })
.then(() => console.log("Connect to MongoDB"))
.catch(err => console.log(`Falid connect to MongoDB ${err}`));

app.use(cors());
app.use(bodyParser.json());
app.use('/shoes',shoes);
app.use('/user',user)
app.use('/request',request)
app.use('/special',special)
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(__dirname + "/uploads"))
app.use(express.static(path.join(__dirname,'public/shoes')))
app.use(express.static(path.join(__dirname,'./public/frontend')))

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname,'public/frontend/index.html'))
})

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'public/shoes/index.html'))
})

const port =  process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listen to port ${port}`)
})