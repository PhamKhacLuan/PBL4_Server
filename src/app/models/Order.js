const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Order = new Schema({
    name: { type: String, maxLength: 55 },
    email: { type: String, maxLength: 100 },
    address: { type: String, maxLength: 100 },
    phone: { type: String, maxLength: 20 },
    sum: { type: String, maxLength: 100 },
    detailOrder: [{
        nameProduct: { type: String, maxLength: 55 },
        price: { type: String, maxLength: 15 },
        amount: { type: String, maxLength: 10 }
    }],
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

//Add plugin
Order.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('Order', Order);
