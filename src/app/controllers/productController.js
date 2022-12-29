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
        var data = fs.readFileSync(product.img.contentType, function(err){
            if(err){
                res.json({
                    message: "Không thể thêm ảnh",
                    error: err.message 
                })
            }
        });
        var linkImg = product.img.contentType;
        var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
        fs.writeFileSync('src\\public\\img\\' + nameImg, data);
        product.img.name = nameImg;
        product.img.contentType = 'src\\public\\img\\' + nameImg;
        product.save()
            .then(() => {
                res.json({
                    message: "Thêm đơn hàng thành công"
                })
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
        const product = new Product(req.body);
        var data = fs.readFileSync(product.img.contentType);
        var linkImg = product.img.contentType;
        var nameImg = linkImg.split('\\')[linkImg.split('\\').length - 1];
        Product.findById(product._id)
            .then((sanpham)=>{
                console.log(sanpham.img.contentType);
                if(sanpham.img.contentType != 'scr\\public\\img\\' + nameImg)
                {
                    fs.writeFileSync('src\\public\\img\\' + nameImg, data);
                }
            })
        product.img.name = nameImg;
        product.img.contentType = 'src\\public\\img\\' + nameImg;  
        Product.updateOne({ _id: product._id }, product)
            .then(() => res.json({
                message : "Cập nhật thành công"
            }))
            .catch(error => res.json({
                message: "Cập nhật thất bại",
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
        let imgName = "src/public/img/" + req.query.img_name;
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
