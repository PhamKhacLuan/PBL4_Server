// const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Order = require('../models/Order');

class OrderController {

    //[POST] //admin/order/stored
    stored(req, res, next) {
        const order = new Order(req.body);
        order.save()
            .then(() => {
                res.redirect('/admin/order/show')
            })
            .catch(error => {
                res.json({
                    messageError: "Có lỗi khi thêm đơn hàng",
                    error: error.message
                })
            })
    }

    //[GET] /admin/order/show
    show(req, res, next) {
        Order.find()
            .then((products) => {
                res.json(
                    mutipleMongooseToObject(products)
                )
            })
            .catch((error) => {
                res.json({
                    messageError: "Có lỗi trong quá trình show",
                    error: error
                })
            })
    }

    //[GET] /admin/order/show/:id
    getOrderById(req, res, next) {
        Order.findById(req.params.id)
            .then((order) => {
                res.json(
                    mongooseToObject(order)
                )
            })
            .catch((error) => res.json({
                messageError: "Tìm kiếm thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/order/:id/force
    forceDelete(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/order/show'))
            .catch(error => res.json({
                messageError: "Xóa cứng thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/order/search
    search(req, res, next) {
        Order.find({ name: { $regex: req.query.name}, phone: { $regex: req.query.phone} })
            .then((orders) => {
                res.json(
                    mutipleMongooseToObject(orders)
                )
            })
            .catch((error) => {
                res.json({
                    messageError: "Có lỗi trong quá trình tìm kiếm",
                    error: error
                })
            })
    }
}

module.exports = new OrderController();
