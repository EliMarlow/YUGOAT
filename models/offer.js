const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    initiator: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: Schema.Types.ObjectId, ref: 'User'},
    itrade: {type: Schema.Types.ObjectId, ref: 'Trade'},
    rtrade: {type: Schema.Types.ObjectId, ref: 'Trade'}
});

module.exports = mongoose.model('Offer', offerSchema);