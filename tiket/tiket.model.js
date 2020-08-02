const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    kode: { type: String, unique: true, required: true },
    judul: { type: String, required: true },
    isi: { type: String, required: true },
    id_pembuat: {type : Schema.Types.ObjectId, required : true, ref: 'User'},
    status : {type: Schema.Types.ObjectId, ref:'TiketStatus' , default: new mongoose.Types.ObjectId('5e008308fbdfd87c2678d330')},
    prioritas : {type: Schema.Types.ObjectId, default:new mongoose.Types.ObjectId('5e04e7b43659dc372a7ba398') },
    kategori :  {type: Schema.Types.ObjectId, default:new mongoose.Types.ObjectId('5e04ea8a3659dc372a7ba5a2') },
    batas_waktu : {type: Date, required:true},
    assignee: {type : Schema.Types.ObjectId, ref: 'User'},
    assigner: {type : Schema.Types.ObjectId, ref: 'User'},
    attachment : [{
    	filename: {type: String},
    	path: {type: String},
    }],
    balasan : [{
    	id_pembuat : {type : Schema.Types.ObjectId, required : true, ref: 'User'},
        isi : {type: String},
        createdAt: {type:Date, required: true}
        

    },{timestamps:true}],
    di_buatkan_admin : [{
    	status : { type : Boolean , default: false},
    	id_admin: {type : String, required : true}
    }]
},{timestamps:true});

module.exports = mongoose.model('Tiket', schema);
