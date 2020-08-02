const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionStringLocal);
//mongoose.connect(config.connectionStringMlab);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Tiket: require('../tiket/tiket.model'),
    TiketStatus: require('../tiket/sub/status/status.model'),
    TiketPrioritas: require('../tiket/sub/prioritas/prioritas.model'),
    TiketKategori: require('../tiket/sub/kategori/kategori.model'),
    Task: require('../task/task.model')
};




//"connectionString": "mongodb://kamina:hirosh1@ds245532.mlab.com:45532/rest_api_tiket",
//"connectionString": "mongodb://localhost:27010/rest_api_tiket",


