const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

//connect to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {console.log('connected to mongodb')});

const image = require('./routes/image');
app.use('/image', image);

app.listen(port, () => console.log("listening to port 5000"));