const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', require('./routes/product'));


module.exports = app;

