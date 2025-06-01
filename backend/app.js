const express = require('express');
const app=express();

// Parse incoming JSON requests
app.use(express.json());

const products = require('./routes/product');
const order = require('./routes/order');
const emailRoutes = require("./routes/email");

app.use('/api/v1', products);
app.use('/api/v1', order);
app.use('/api', emailRoutes);

module.exports = app;
