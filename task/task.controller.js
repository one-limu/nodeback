const express = require('express');
const router = express.Router();
const tiketService = require('../tiket/tiket.service');
const userService = require('../users/user.service');
const MyUtility = require('../_helpers/my-utility');
const taskSerivice = require('./task.service.js')

// routes

router.post('/buat/:id', add);
router.get('/', getAll);
router.get('/:id', getOne);
router.get('/tiket/:id', getAllByTiket);
router.put('/:id', update);
router.delete('/:id', _delete);

router.post('/:id/reply', addC);
router.get('/:id/reply', getAllC);
router.get('/:id/reply/:id2', getOneC);
router.put('/:id/reply/:id2', updateC);
router.delete('/:id/reply/:id2', _deleteC);


module.exports = router;

function add(req, res, next) {
    
    var kode = `${MyUtility.rand(2,'uppercase')}-${MyUtility.rand(4,'number')}`
    req.body.kode = kode;
    req.body.id_pembuat = req.user.sub;   
    req.body.kode_tiket = req.params.id;
    const data = req.body
    taskSerivice.create(req.body)
        .then((results) => res.json({results}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    taskSerivice.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getAllByTiket(req, res, next) {
    taskSerivice.getAllByTiket(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getOne(req,res,next){
     taskSerivice.getOne(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const data = req.body
    taskSerivice.update(req.params.id, req.body)
        .then((results) => res.json({results}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    const data = req.params.id
    taskSerivice.delete(req.params.id)
        .then((results) => res.json({results}))
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
