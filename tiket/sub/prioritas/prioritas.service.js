const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ThisSub = db.TiketPrioritas;
const USer = db.User;



module.exports = {
    getAll,
    getOne,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await ThisSub.find().select();
}

async function getOne(id) {
    return await ThisSub.findById(id);
}



async function create(tiketParam) {
    // validate
    
   
    const thisSub = new ThisSub(tiketParam);

    // save user
    await thisSub.save();
}

async function update(id, tiketParam) {

    const thisSub = await ThisSub.findById(id);

    // validate
    if (!thisSub) throw 'Prioritas tidak ditemukan';

    // copy tiketParam properties to thisSub
    Object.assign(thisSub, tiketParam);

    await thisSub.save();
}

async function _delete(id) {
     const thisSub = await ThisSub.findById(id);

    // validate
    if (!thisSub) throw 'Prioritas tidak ditemukan';
      await ThisSub.findOneAndRemove({'_id': id});
}
