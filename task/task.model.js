const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    kode: { type: String, unique: true, required: true },
    kode_tiket: {type: String, required: true},
    judul: { type: String, required: true },
    isi: { type: String, required: true },
    id_pembuat: {type : String, required : true},
    petugas: { type: String},
    status : {type: String},
    attachment : [{
    	filename: {type: String},
    	path: {type: String},
    }],
    balasan : [{
    	id_pembuat : {type: String},
    	isi : {type: String}

    },{timestamps:true}]
},{timestamps:true});

module.exports = mongoose.model('Task', schema);
