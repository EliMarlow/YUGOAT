const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    type: {type: String},
    frameType: {type: String},
    desc: {type: String},
    atk: {type: Number},
    def: {type: Number},
    level: {type: Number},
    race: {type: String},
    attribute: {type: String},
    card_images: {type: Array}
}
);
//collection name is cards in the database
module.exports = mongoose.model('Card', cardSchema);


