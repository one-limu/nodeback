const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tiket = db.Tiket;
const USer = db.User;
const Kompre = db.Kompre;



module.exports = {
    getAll,
    create,
    update,
    delete: _delete,
 
};



async function getAll() {
    return await Tiket.find().select();
}



async function create(param) {
    // validate
    
   
    const Kompre = new Kompre(param);

    // save user
    await Kompre.save();
    return kompre;
}

async function update(id, tiketParam) {
    const tiket = await Tiket.findOne({'kode' : id});
    
    // validate
    if (!tiket) throw 'tiket tidak ditemukan';

    // copy tiketParam properties to tiket
    Object.assign(tiket, tiketParam);
    console.log(tiket)

    await tiket.save();
    return tiket;
}

async function _delete(id) {
    const tiket = await Tiket.findOne({'kode' : id});
    // validate
    if (!tiket) throw 'tiket tidak ditemukan';

    await Tiket.deleteOne({kode: id});
    return tiket;
}


//komen



