var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    //model
    var users = require('../../models/users')(connection, Sequelize);

    router.route("/signin")
    // get all clients
    .post(function(req, res) {

        var login = req.body.login;
        var password = req.body.password;
        if(!login || !password ) {
            res.status(500).send({
                "success": false,
                "error": "Login and Password are required"
            });
        } else {
            users.findOne({
                where: {
                    login: login
                }
            }).then(function (user) {

                if (user != null) {

                    if(!bcrypt.compareSync(password, user.get('password'))) {
                        res.status(401).send({
                            "success": false,
                            "error": "Unauthorized : Password is incorrect"
                        });
                    } else {
                        res.status(200).send({
                            "success": true,
                            "data": user
                        })
                    }
                } else {
                    res.status(401).send({
                        "success": false,
                        "error": "Unauthorized : User not found"
                    });
                }


            });
        }
        
    })

    router.route("/signup")
        .post(function(req, res) {

            //params
            var login = req.body.login;
            var email = req.body.email;
            var password = req.body.password;

            if(!login || !email || !password ) {
                res.status(500).send({
                    "success": false,
                    "error": "login, email and password are required"
                });
            } else {

                /**
                 * Check if user exist
                 */
                users.findOne({
                    where : {
                        $or : [{
                            email: email
                        }, {
                            login: login
                        }]
                    }
                }).then(function(user) {

                    if (user == null) {
                        password = bcrypt.hashSync(password);

                        users.create({
                            login: login,
                            password: password,
                            email: email
                        }).then(function (success) {
                            res.status(200).send({
                               success: true,
                                data: success
                            });
                        });
                    } else {
                        res.status(401).send({
                            "success": false,
                            "error": "Unauthorized : User exist"
                        });
                    }
                });
            }


        });

};
