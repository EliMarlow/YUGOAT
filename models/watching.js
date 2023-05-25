const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchingSchema = new Schema({
    status: {type: String, default: 'YES'},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    trade: {type: Schema.Types.ObjectId, ref: 'Trade'},
});

module.exports = mongoose.model('Watching', watchingSchema);