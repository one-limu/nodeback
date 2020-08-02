const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, unique: true, required: true },
},{timestamps:true});

module.exports = mongoose.model('Task', schema);