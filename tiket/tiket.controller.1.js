const express = require('express');
const router = express.Router();
const tiketService = require('./tiket.service');
const userService = require('../users/user.service');
const MyUtility = require('../_helpers/my-utility');
const config = require('config.json');
var mongoose = require('mongoose'); 



// routes

router.post('/buat', add);
router.get('/', getAll);
router.get('/code/:id', getOneByCode);
router.get('/byId/:id', getAllById);
router.get('/byStatus/:id', getByStatus);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', _delete);

router.post('/:id/reply', addC);
router.get('/:id/reply', getAllC);
router.get('/:id/reply/:id2', getOneC);
router.put('/:id/reply/:id2', updateC);
router.delete('/:id/reply/:id2', _deleteC);


module.exports = router;

function add(req, res, next) {
    
    var kode = `${MyUtility.rand(4,'uppercase')}-${MyUtility.rand(2,'uppercase')}-${MyUtility.rand(4,'number')}`
    req.body.kode = kode;
   // req.body.id_pembuat = req.user.sub;
   req.body.id_pembuat = new mongoose.Types.ObjectId(req.body.id_pembuat)
   req.body.status = new mongoose.Types.ObjectId(req.body.status)
   req.body.kategori = new mongoose.Types.ObjectId(req.body.kategori)
   req.body.prioritas = new mongoose.Types.ObjectId(req.body.prioritas)


    const data = req.body
    tiketService.create(req.body)
        .then((results) => res.json({results}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    //pagination
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    if(size < 0 ){
        size = 5
    }
    
    //etc
    var status = req.query.status
    var user_id = req.user.sub;
    
    var pagination = {}

    if(size){pagination.size = size}
    if(pageNo){pagination.pageNo = pageNo}

    var filter = {}
    if (status){filter.status = new mongoose.Types.ObjectId(status)}
    if (user_id){filter.id_pembuat = new mongoose.Types.ObjectId(user_id)}
  // console.log(filter.id_pembuat + ';;' +  typeof(filter.id_pembuat))

   // return res.json(filter)

   

    if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    
        tiketService.getAll(pagination,filter)
            .then(results => res.json(results))
            .catch(err => next(err));
}

function getAllById(req, res, next) {
    tiketService.getAllById()
        .then(results => res.json(results))
        .catch(err => next(err));
}

function getOne(req, res, next) {
    tiketService.getOne(req.params.t_code)
        .then(results => results ? res.json(results) : res.sendStatus(404))
        .catch(err => next(err));
}

function getOneByCode (req, res, next) {
    tiketService.getOneByCode(req.params.id)
        .then(results => results ? res.json(results) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const data = req.body
    tiketService.update(req.params.id, req.body)
        .then((results) => res.json({results}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const data = req.params.id
    tiketService.delete(req.params.id)
        .then((deleted) => res.json({deleted}))
        .catch(err => next(err));
}

function getByStatus(req, res, next){
    const data = req.params.getByStatus
    tiketService.getByStatus(data)
        .then((tiket) => res.json({tiket}))
        .catch(err => next(err));
}






//087882652211/ 081359113439
//Comment Section

function addC(req, res, next) {
    
    //var kode = `${MyUtility.rand(4,'uppercase')}-${MyUtility.rand(2,'uppercase')}-${MyUtility.rand(4,'number')}`
    //req.body.kode = kode;
    req.body.id_pembuat = req.user.sub;   

    const data = req.body
    tiketService.createC(req.params.id,req.body)
        .then(() => res.json({data}))
        .catch(err => next(err));
}

function getAllC(req, res, next) {
    tiketService.getAllC(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getOneC(req, res, next) {
    tiketService.getOneC(req.params.id,req.params.id2)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateC(req, res, next) {
    const data = req.body
    tiketService.updateC(req.params.id, req.params.id2, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteC(req, res, next) {
    const data = req.params.id
    tiketService.deleteC(req.params.id,req.params.id2)
        .then(() => res.json({data}))
        .catch(err => next(err));
}
