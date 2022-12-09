// const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Product = require('../models/InforProductModels');
const Order = require('../models/Order');
const { restore } = require('./productController');

//[GET] admin/statistical/show
let show = async (req, res, next) => {
    const countOrder = await Order.count({ type: '_id' });
    Order.find()
        .then((orders) => {
            let total = 0;
            for (let i = 0; i < orders.length; i++) {
                total += Number(orders[i].sum);
            }
            Product.find()
                .then((products) => {
                    let amount = 0;
                    for (let i = 0; i < products.length; i++) {
                        amount += Number(products[i].amount);
                    }
                    res.json({
                        countOrder: countOrder,
                        total: total,
                        amount: amount
                    })
                })
                .catch((error) => {
                    res.json({
                        messageError: "Có lỗi trong quá trình show",
                        error: error
                    })
                })
        })
        .catch((error) => {
            res.json({
                messageError: "Có lỗi trong quá trình show",
                error: error
            })
        })
}



module.exports = {
    show
};
