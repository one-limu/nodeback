const express = require('express');
const router = express.Router();
const thisService = require('./kategori.service');
const userService = require('../../../users/user.service');

// routes

router.post('/', add);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function add(req, res, next) {
    
    req.body.id_pembuat = req.user.sub;   
    const data = req.body
    thisService.create(req.body)
        .then(() => res.json({data}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    thisService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getOne(req, res, next) {
    thisService.getOne(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    const data = req.body
    thisService.update(req.params.id, req.body)
        .then(() => res.json({data}))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    const data = req.params.id
    thisService.delete(req.params.id)
        .then((results) => res.json({results}))
        .catch(err => next(err));
}
