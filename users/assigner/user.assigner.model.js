const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type : Schema.Types.ObjectId, required : true, ref: 'User', unique:true},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserAssigner', schema);