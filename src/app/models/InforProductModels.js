const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const InforProductModels = new Schema({
    name: {type: String, maxLength: 55},
    brand: { type: String, maxLength: 55 },
    price: { type: String, maxLength: 15},
    system: { type: String, maxLength: 15 },
    img: { name: String, contentType: String},
    memory: { type: String, maxLength: 10 },
    ram: { type: String, maxLength: 10 },
    description: { type: String, maxLength: 300 },
    amount: {type: String, maxLength: 10},
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

//Add plugin
InforProductModels.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true
});
mongoose.plugin(slug);

module.exports = mongoose.model('InforProductModels', InforProductModels);
