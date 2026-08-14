const products = require('../data/products.json');
const Product = require('../models/productModel');

exports.seedProducts = async (req, res, next) => {
    try {
        await Product.deleteMany();
        console.log('Products deleted!');
        await Product.insertMany(products);
        console.log('All products added!');
        res.status(200).json({
            success: true,
            message: 'Database successfully seeded with products!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
