const Order = require('../models/orderModel');
const Product = require('../models/productModel');

//Create New Order - api/v1/order/new
exports.newOrder =  async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
    })

    res.status(200).json({
        success: true,
        order
    })
}

//Get Single Order - api/v1/order/:id
exports.getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return res.status(404).json({
            success: false,
            message: `Order not found with this id: ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        order
    })
}

//Admin: Get All Orders - api/v1/orders
exports.orders = async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

//Update Order / Order Status - api/v1/order/:id
exports.updateOrder =  async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered') {
        return res.status(400).json({
            success: false,
            message: 'Order has been already delivered!'
        });
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
    
};

async function updateStock (productId, quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})
}

// Delete Order - api/v1/order/:id
exports.deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return res.status(404).json({
            success: false,
            message: `Order not found with this id: ${req.params.id}`
        });
    }

    await order.deleteOne();
    res.status(200).json({
        success: true
    })
}