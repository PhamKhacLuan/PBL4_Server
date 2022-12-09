// const Course = require('../models/Course');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Product = require('../models/InforProductModels');
const formidable = require('formidable');
const fs = require('fs');

class ProductController {
    // [GET] //admin/product/create
    create(req, res, next) {

    }

    //[POST] //admin/product/stored
    stored(req, res, next) {
        const product = new Product(req.body);
        product.img.data = fs.readFileSync(product.img.contentType);
        product.save()
            .then(() => {
                res.redirect('/admin/product/show')
            })
            .catch(error => {
                res.json({
                    message: "Có lỗi khi thêm đơn hàng",
                    error: error.message
                })
            })
    }

    //[GET] /admin/product/show
    show(req, res, next) {
        Product.find()
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

    //[GET] //admin/product/:id/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then((product) => {
                res.json(
                    mongooseToObject(product)
                )
            })
            .catch((error) => res.json({
                messageError: "Tìm kiếm thất bại",
                error: error
            }))
    }

    //[PUT] //admin/product/:id
    update(req, res, next) {
        req.body.img.data = fs.readFileSync(req.body.img.contentType);
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Cập nhật thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/product/:id/force
    forceDelete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Xóa cứng thất bại",
                error: error
            }))
    }

    //[DELETE] //admin/product/:id
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Xóa mềm thất bại",
                error: error
            }))
    }

    //[PATCH] //admin/products/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('/admin/product/show'))
            .catch(error => res.json({
                messageError: "Khôi phục thất bại",
                error: error
            }))
    }

    //[GET] //admin/products/search?name=?&brand=?
    search(req, res, next) {
        Product.find({ name: { $regex: req.query.name }, brand: { $regex: req.query.brand } })
            .then((products) => {
                res.json(
                    mutipleMongooseToObject(products)
                )
            })
            .catch((error) => {
                res.json({
                    messageError: "Có lỗi trong quá trình tìm kiếm",
                    error: error
                })
            })
    }

    //[GET] /admin/product/img
    getImg(req, res) {
        let imgName = "../Server/src/public/img/" + req.query.img_name;
        fs.readFile(imgName, (err, data) => {
            if (err) {
                res.json({
                    result: "fail",
                    messageError: err.message
                })
            }
            else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    }
}


module.exports = new ProductController();
