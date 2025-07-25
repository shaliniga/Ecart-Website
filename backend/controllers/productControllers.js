const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');

//Get Products - /api/v1/products
exports.getProducts=async(req,res,next)=>{
    const resPerPage = 4;

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .paginate(resPerPage);

    const products= await apiFeatures.query;
    res.status(200).json({
        sucess:true,
        count:products.length,
        products
    })
}

//Create Product - /api/v1/product/new
exports.newProduct = async(req,res,next)=>{
    const product= await Product.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}

//Get Single Product - api/v1/product/:id
exports.getSingleProduct=async(req,res,next)=>{
    const product= await Product.findById(req.params.id);

     if(!product) {
       return res.status(404).json({
            success: false,
            message: "Product not found"
        });
     }
    res.status(201).json({
        sucess:true,
        product
    })
}

//Update Product - api/v1/product/:id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        product
    })

}

//Delete Product - api/v1/product/:id
exports.deleteProduct = async (req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    await product.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })

}