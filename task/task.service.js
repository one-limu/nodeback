const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tiket = db.Tiket;
const USer = db.User;
const Task = db.Task;



module.exports = {
    getAll,
    getOne,
    getAllByTiket,
    create,
    update,
    delete: _delete,
    //komen
    getAllC,
    getOneC,
    createC,
    updateC,
    deleteC: _deleteC

};



async function getAll() {
    return await Task.find().select();
}

async function getOne(id) {
    return await Task.findOne({'kode' : id});
}

async function getAllByTiket(kodeTiket){
    var _ = require("underscore");
    var tiketTemp =  await Tiket.findOne({'kode' : kodeTiket})
    if (!tiketTemp) throw 'tiket tidak ditemukan';

    var taskTemp = await Task.find();
    var filtered = _.filter(taskTemp, function(item){return item.kode_tiket = kodeTiket})
    return filtered;
}

async function create(param) {
    // validate
    
   
    const task = new Task(param);

    // save user
    await task.save();
    return task
}

async function update(id, param) {
    const task = await Task.findOne({'kode' : id});
    
    // validate
    if (!task) throw 'task tidak ditemukan';

    // copy param properties to task
    Object.assign(task, param);
    console.log(task)

    await task.save();
    return task;
}

async function _delete(id) {
    const task = await Task.findOne({'kode' : id});
    // validate
    if (!task) throw 'task tidak ditemukan';

    await Task.deleteOne({kode: id});
    return task;
}


//komen



async function getAllC(id) {
    return await Tiket.findOne({'kode' : id}).select('balasan');
}

async function getOneC(id,id2) {
    var _ = require("underscore");
    var tiketTemp =  await Tiket.findOne({'kode' : id})
    if (!tiketTemp) throw 'tiket tidak ditemukan';
    //console.log(tiketTemp)
    var filtered = _.filter(tiketTemp.balasan, function (item) { return item.id == id2});
    if (!filtered.length) throw 'reply tidak ditemukan';
    return filtered; 
}

async function createC(kode,replyparam) {
    // validate
    var tiketTemp = await Tiket.findOne({'kode' : kode});
    tiketTemp.balasan.push(replyparam);   
    const tiket = new Tiket(tiketTemp);

    // save user
    await tiket.save();
}


//kodeT = kode tiket
//idC = id comment
async function updateC(kodeT, idC, param) {
   var _ = require("underscore");
   var tiket = await Tiket.findOne({'kode' : kodeT});
   //validate
   if (!tiket) throw 'tiket tidak ditemukan';

   var reply = _.filter(tiket.balasan, function (item) { return item.id == idC});
   if (!reply.length) throw 'reply tidak ditemukan';

   //ubah komentar
   var filtered = tiket;
   filtered.balasan = _.map(filtered.balasan, function(val, key) {
        if(val.id == idC){
            val.isi = param.isi
        }
        return val
   })

   Object.assign(tiket, filtered)

    await tiket.save();
}

async function _deleteC(kodeT, idC,) {
   var _ = require("underscore");
   var tiket = await Tiket.findOne({'kode' : kodeT});
   //validate
   if (!tiket) throw 'tiket tidak ditemukan';

   var reply = _.filter(tiket.balasan, function (item) { return item.id == idC});
   if (!reply.length) throw 'reply tidak ditemukan';


    //hapus Komentar
   var filtered = tiket;
   var keyComment;
   filtered.balasan = _.map(filtered.balasan, function(val, key) {
        if(val.id == idC){
            keyComment = key
        }
        return val
   })
   delete filtered.balasan[keyComment]
   
   tiket.balasan = filtered.balasan
   await tiket.save();
}
