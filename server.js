require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/user.controller'));
app.use('/tiket', require('./tiket/tiket.controller'));
app.use('/manajementiket/status', require('./tiket/sub/status/status.controller'));
app.use('/manajementiket/prioritas', require('./tiket/sub/prioritas/prioritas.controller'));
app.use('/manajementiket/kategori', require('./tiket/sub/kategori/kategori.controller'));
app.use('/task', require('./task/task.controller'));
app.use('/kompre', require('./kompre/kompre.cotroller'));

app.use('/users/assigner', require('./users/assigner/user.assigner.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});