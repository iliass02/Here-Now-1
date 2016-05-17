var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    //model
    var interest = require('../../models/interest')(connection, Sequelize);
    var userInterest = require('../../models/users_interest')(connection, Sequelize);
    var favorites = require('../../models/favorites')(connection, Sequelize);

    router.route('/interests')
        .get(function (req, res) {

            interest.findAll().then(function (interest) {
                res.status(200).send({
                    success: true,
                    data: interest
                })
            })

        })

        .post (function (req, res) {

            var interests_id = req.body.interests_id;
            var user_id = req.body.user_id;

            if (!interests_id || !user_id || interests_id.length == 0) {
                res.status(500).send({
                    'success': false,
                    'error': "Interets_id and user_id are required !"
                });
            } else {
                for (var i = 0; i < interests_id.length; i++) {

                    userInterest.create({
                        interest_id: interests_id[i],
                        user_id: user_id
                    }).error(function (err) {
                        res.status(500).send({
                            "success": false,
                            "error": err
                        });
                    });
                    
                }
                res.status(200).send({
                    "success": true
                });
            }
        });

    router.route('/users/:userId/interests/favorites')
        .post(function (req, res) {

            var userId = req.params.userId;
            var address = req.body.address;
            var name = req.body.name;
            var latitude = req.body.latitude;
            var longitude = req.body.longitude;
            

            if (!address || !name || !latitude || !longitude) {
                res.status(500).send({
                    success: false,
                    error: "adresse, name, latitude, longitude parameters are required !"
                });
            } else {
                favorites.create({
                    address: address,
                    name: name,
                    latitude: latitude,
                    longitude: longitude,
                    user_id: userId
                }).then(function (favorite) {
                    res.status(200).send({
                        success: true,
                        data: favorite
                    });
                }).error(function (err) {
                    res.status(500).send({
                        success: true,
                        error: err
                    });
                });
            }

        })

        .get(function (req, res) {
            var userId = req.params.userId;

            favorites.findAll().then(function(favorites) {
               res.status(200).send({
                   success: true,
                   data: favorites
               });
            }).error(function (err) {
                res.status(500).send({
                    success: true,
                    error: err
                });
            });

        })

    router.route('/interests/user/:user_id')
        .get(function (req, res) {

            var user_id = req.params.user_id;
            if(!user_id) {
                res.status(500).send({
                    success: false,
                    error: 'User_id parameter is required'
                });
            } else {
                var request = "SELECT i.name name FROM users_interest as ui, interest as i WHERE ui.user_id = ? AND ui.interest_id = i.id";
                var table = [user_id];
                request = mysql.format(request, table);
                connection.query(request,function (err, data) {

                    if(err) {
                        res.status(500).send({
                            success: false,
                            error: err
                        });
                    } else {
                        res.status(200).send({
                            success: true,
                            data: data
                        });
                    }

                });
            }

        })

};