const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nama: { type: String, unique: true, required: true },
    nohp: { type: String, required: true },
    ttl: { type: Date, required: true },
    hobi: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);