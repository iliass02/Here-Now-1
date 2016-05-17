var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('Here-and-now', 'root', 'root', {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

app.get('/api/v1/', function(req, res) {
    res.send("API V1 Here & Now");
});

require('./api/routes/loginRoute.js')(router, sequelize, mysql);
require('./api/routes/interestsRoute.js')(router, sequelize, mysql);

app.use('/api/v1/', router);
app.listen(port);
console.log("cool : " + port);