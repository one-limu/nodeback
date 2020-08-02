const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ThisSub = db.TiketStatus;
const USer = db.User;
const Tiket = db.Tiket;
var mongoose = require('mongoose'); 



module.exports = {
    getAll,
    getOne,
    create,
    update,
    delete: _delete
};



async function getAll() {
    var a = await ThisSub.find().select();
    var b = []
    //console.log(a.length)
    
    
      
        for (let index = 0; index < a.length; index++) {
          // Get num of each fruit
          var ad = await Tiket.find({status: new mongoose.Types.ObjectId(a[index]._id)}).count()
          b.push(ad)
          
        }

      a[0].dd= 'd'
       // console.log('End', a)
        

      



    return a;

    
    
   
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
    if (!thisSub) throw 'Status tidak ditemukan';

    // copy tiketParam properties to thisSub
    Object.assign(thisSub, tiketParam);

    await thisSub.save();
}

async function _delete(id) {
    
    const thisSub = await ThisSub.findById(id);

    // validate
    if (!thisSub) throw 'Status tidak ditemukan';
    await ThisSub.findOneAndRemove({'_id': id});
}
