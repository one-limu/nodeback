const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	nama : {type: String, required: true, unique: true},
	batas_waktu: {type:Number,required:true},
	id_pembuat: {type: String, required :  true}

},{timestamps:true});

module.exports = mongoose.model('TiketPrioritas', schema);
