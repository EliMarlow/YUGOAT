const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deckSchema = new Schema({
    id: {type: Number},
    authorid: {type: Number},
    card_list: {type: Array}
}
);
//collection name is cards in the database
module.exports = mongoose.model('Deck', deckSchema);