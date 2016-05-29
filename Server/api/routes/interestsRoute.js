var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    /*
    Model for ORM
     */
    var Interest = require('../../models/interest')(connection, Sequelize);
    var UserInterest = require('../../models/users_interest')(connection, Sequelize);
    var Favorites = require('../../models/favorites')(connection, Sequelize);

    router.route('/interests')
        /*
        GET all interests
         */
        .get(function (req, res) {

            Interest.findAll().then(function (interest) {
                res.status(200).send({
                    success: true,
                    data: interest
                })
            })

        })

    router.route('/users/:userId/interests/favorites')
        /*
        POST favorites interest by userId
         */
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

                Favorites.findAll({
                    where: {
                        latitude: latitude,
                        longitude: longitude,
                        user_id: userId
                    }
                }).then(function (favorite) {

                    console.log(favorite);

                    if (favorite.length == 0) {
                        Favorites.create({
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
                    } else {
                        res.status(401).send({
                            success: true,
                            error: "this address is already exist in your favorites !"
                        });
                    }


                }).error(function (err) {
                    res.status(500).send({
                        success: false,
                        error: err
                    });
                });
            }

        })

        /*
        GET all interest favorites by userId
         */
        .get(function (req, res) {
            var userId = req.params.userId;

            Favorites.findAll({
                where: {
                    user_id: userId
                }
            }).then(function(favorites) {
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

        });

    router.route('/interests/favorites/:favoriteId')
        .delete(function (req, res) {
            var favoriteId = req.params.favoriteId;

            if (!favoriteId) {
                res.status(500).send({
                   success: false,
                    error: "favoriteId params is required !"
                });
            } else {
                Favorites.destroy({
                    where: {
                        id: favoriteId
                    }
                }).then(function(ok) {
                    res.status(200).send({
                        success: true,
                        data: ok
                    });
                }).error(function (err) {
                    res.status(500).send({
                        success: false,
                        data: err
                    });
                });
            }
        });

    router.route('/users/:userId/interests')
        /*
         Get All Interests by userId
         */
        .get(function(req, res) {
            var user_id = req.params.userId;
            if(!user_id) {
                res.status(500).send({
                    success: false,
                    error: 'User_id parameter is required'
                });
            } else {
                //LEFT JOIN
                Interest.hasMany(UserInterest, {foreignKey: 'interest_id'});
                UserInterest.belongsTo(Interest, {foreignKey: 'interest_id'});

                UserInterest.findAll({
                    where: {
                        user_id: user_id
                    }, include: [Interest]
                }).then(function (interests) {
                   res.status(200).send({
                       success: true,
                       data: interests
                   });
                }).error(function (err) {
                    res.status(500).send({
                        success: false,
                        error: err
                    });
                })
            }
        })

        /*
        POST ALL interests choice by userId
         */
        .post (function (req, res) {

            var interests_id = req.body.interests_id;
            var user_id = req.params.userId;

            if (!interests_id || !user_id || interests_id.length == 0) {
                res.status(500).send({
                    'success': false,
                    'error': "Interets_id and user_id are required !"
                });
            } else {
                for (var i = 0; i < interests_id.length; i++) {

                    UserInterest.create({
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
};