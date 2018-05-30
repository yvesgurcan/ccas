const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    make: String,
    model: String,
    packageLevel: String,
    customerId: Number,
    supplier: String,
    supplierOrderId: String,
},
{
    timestamps: true,
});

module.exports.Order = mongoose.model('Order', OrderSchema);
