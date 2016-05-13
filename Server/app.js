var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var path = require('path');

var db = mysql.createConnection({
    user: 'root',
<<<<<<< Updated upstream
    password: 'root',
=======
    password: 'education',
>>>>>>> Stashed changes
    database: 'Here-and-now',
    // debug: true
});

db.connect(function(err) {
    if (err)
        console.log("Connexion à la BDD : KO !!!!!!!!!!!!!!!!!!!!");
    else
        console.log("Connexion à la BDD : OK");
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

require('./api/routes/loginRoute.js')(router, db, mysql);
require('./api/routes/interestsRoute.js')(router, db, mysql);

app.use('/api/v1/', router);
app.listen(port);
console.log("cool : " + port);
