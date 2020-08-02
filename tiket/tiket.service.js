const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Tiket = db.Tiket;
const USer = db.User;
const Prioritas = db.TiketPrioritas;


var mongoose = require('mongoose'); 



module.exports = {
    getAll,
    getAllById,
    getOne,
    getOneByCode,
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



async function getAll(pg,filter,sort) {
var query = {}
query.skip = pg.size * (pg.pageNo - 1)
query.limit = pg.size

//var resP
var totalCount,hasil,totalPages

// Find some documents
totalCount =  await Tiket.find(filter).count()

hasil = await Tiket.find(filter,{},query)
.populate([{
    path: 'prioritas',
    model: 'TiketPrioritas',
    select: 'nama id_pembuat batas_waktu',
    populate:{
        path: 'id_pembuat',
        model: 'User',
        select: 'username'
    }
}]).sort(sort)
console.log(sort)
//console.log(pg)
size = pg.size
pageNo = pg.pageNo

totalPages = Math.ceil(totalCount / size)
if(totalPages === null){
    totalPages = 1;
}

var response = {
    "error" : false,
    "pages": totalPages,
    "current_page" : pageNo,
    "size" : size,
    "total_data" : totalCount,
    "data" : hasil,
    "filter" : filter
};

return response

    //res.json(response);
    //return await Tiket.find().select();
}

async function getByStatus(status){
    return await Tiket.find({'status' : status})
}

async function getAllById(id) {
    return await Tiket.find({id_pembuat : id}).select();
}


async function getOne(id) {
    return await Tiket.findOne({'kode' : id});
}

async function getOneByCode(id) {
    var data = await Tiket.findOne({'kode' : id});
   
    const docs = await db.Tiket.aggregate([
       {
        "$match":{"id_pembuat" : data.id_pembuat}
       },
       
        {
        "$lookup": {
          "let": { "userObjId": "$id_pembuat" },
          "from": "users",
          "pipeline": [
            { "$match": { "$expr": {
                
                "$eq": [ "$_id", "$$userObjId" ],
            } } }
          ],
          "as": "userDetails"
        }
    }
      ])

    var dd = await Tiket.findOne({
        kode: id
    })
    .populate([{
        path: 'status',
        model: 'TiketStatus',
        select: 'nama id_pembuat',
        populate:{
            path: 'id_pembuat',
            model: 'User',
            select: 'username'
        }
    }])
    .populate([{
        path: 'kategori',
        model: 'TiketKategori',
        select: 'nama id_pembuat',
        populate:{
            path: 'id_pembuat',
            model: 'User',
            select: 'username'
        }
    }])
    .populate([{
        path: 'prioritas',
        model: 'TiketPrioritas',
        select: 'nama id_pembuat batas_waktu',
        populate:{
            path: 'id_pembuat',
            model: 'User',
            select: 'username'
        }
    }])
    .populate('id_pembuat', {username: 1, firstName: 1, lastName: 1})
    .populate('balasan.id_pembuat', {username: 1, firstName: 1, lastName: 1})
    .populate('assignee', {username: 1, firstName: 1, lastName: 1})
     
      
     // console.log(dd)
     
    
    return dd
}





async function create(tiketParam) {
    // validate
    var prioritas = await Prioritas.findOne(tiketParam.prioritas)

    //console.log(prioritas)
    var batas_waktu =    Date.now() + prioritas.batas_waktu
//console.log(batas_waktu)
   tiketParam.batas_waktu = batas_waktu
    

    
   
    const tiket = new Tiket(tiketParam);

    // save user
    await tiket.save();
    return tiket;
}

async function update(id, tiketParam) {

    //const tiket = await Tiket.findOne({'kode' : id});
   // var a = tiketParam
    //a._id = new mongoose.Types.ObjectId(a._id)
   // a.status = new mongoose.Types.ObjectId(a.status._id)
    //a.prioritas = new mongoose.Types.ObjectId(a.prioritas._id)
    //a.kategori = new mongoose.Types.ObjectId(a.kategori._id)
    //a.id_pembuat = new mongoose.Types.ObjectId(a.id_pembuat._id)

    //console.log(a)
    // validate
    //if (!tiket) throw 'tiket tidak ditemukan';
    var filter = {}
   
   if(tiketParam.status){
    filter.status = new mongoose.Types.ObjectId(tiketParam.status)
   }
   
   if(tiketParam.assignee){
    filter.assignee = new mongoose.Types.ObjectId(tiketParam.assignee)
   }
   
   console.log(filter)
    

   
    var a = await Tiket.updateOne({'kode' : id},filter)

    // copy tiketParam properties to tiket
    //Object.assign(tiket, a);
   // console.log(tiket)

   // await tiket.save();
    return a;
}

async function _delete(id) {
    const tiket = await Tiket.findOne({'kode' : id});
    // validate
    if (!tiket) throw 'tiket tidak ditemukan';

    await Tiket.deleteOne({kode: id});
    return tiket;
}


//komen



async function getAllC(id) {
    return await Tiket.findOne({'kode' : id}).select('balasan');
}

async function getOneC(id,id2) {
    var _ = require("underscore");
    var tiketTemp =  await Tiket.findOne({'kode' : id})
    if (!tiketTemp) throw 'tiket tidak ditemukan';
  //  console.log(tiketTemp)
    var filtered = _.filter(tiketTemp.balasan, function (item) { return item.id == id2});
    if (!filtered.length) throw 'reply tidak ditemukan';
    return filtered; 
}

async function createC(kode,replyparam) {
    // validate
    var tiketTemp = await Tiket.findOne({'kode' : kode});
    reply = replyparam;
    reply.createdAt = Date.now()
   // console.log(reply)
    
    tiketTemp.balasan.push(reply);   
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
