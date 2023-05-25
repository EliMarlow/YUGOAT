const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    category: {type: String},
    status: {type: String},
    desc: {type: String, required: [true, 'description is required'], 
              minLength: [10, 'the description should have at least 10 characters']}
},
{timestamps: true}
);
//collection name is trades in the database
module.exports = mongoose.model('Trade', tradeSchema);


