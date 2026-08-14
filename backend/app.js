const express = require('express');
const app=express();

// Parse incoming JSON requests
app.use(express.json());

const products = require('./routes/product');
const order = require('./routes/order');
const emailRoutes = require("./routes/email");

const path = require('path');

app.use('/api/v1', products);
app.use('/api/v1', order);
app.use('/api', emailRoutes);

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

module.exports = app;
