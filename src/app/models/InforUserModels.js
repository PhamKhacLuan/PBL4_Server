const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const InforUserModel = new Schema({
    password: {type: String, maxLength: 255},
    name: { type: String, maxLength: 55 },
    email: { type: String, maxLength: 100},
    address: { type: String, maxLength: 100 },
    phone: { type: String, maxLength: 20 },
    role: { type: String, maxLength: 5 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

//Add plugin
InforUserModel.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt : true
});
mongoose.plugin(slug);

module.exports = mongoose.model('InforUserModel', InforUserModel);
