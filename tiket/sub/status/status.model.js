const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	nama : {type: String, required: true, unique: true},
	id_pembuat: {type: Schema.Types.ObjectId, required :  true, ref:'User'}

},{timestamps:true});

module.exports = mongoose.model('TiketStatus', schema);
