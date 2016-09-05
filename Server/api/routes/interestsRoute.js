var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    /*
    Model for ORM
     */
    var Interest = require('../../models/interest')(connection, Sequelize);
    var UserInterest = require('../../models/users_interest')(connection, Sequelize);
    var Favorites = require('../../models/favorites')(connection, Sequelize);

    /**
     * @api {GET} /interests All Interests
     * @apiName GET Interests
     * @apiGroup Interests
     *
     * @apiSuccess {Number} id User id.
     * @apiSuccess {String} name  Name of the Interest.
     */
    router.route('/interests')
        .get(function (req, res) {
            Interest.findAll().then(function (interest) {
                res.status(200).send({
                    success: true,
                    data: interest
                });
            });
        });


    router.route('/users/:userId/interests/favorites')
    /**
     * @api {POST} /users/:userId/interests/favorites news Favorites Interests
     * @apiName POST Favorite
     * @apiGroup Interests
     *
     * @apiParam {String} address Address interest
     * @apiParam {String} name Name interest
     * @apiParam {String} latitude Latitude interest
     * @apiParam {String} longitude Longitude interest
     *
     * @apiSuccess {Number} id  ID of the Favorite
     * @apiSuccess {String} address  Address of the Favorite
     * @apiSuccess {String} name  Name of the Favorite
     * @apiSuccess {String} latitude  Latitude of the Favorite
     * @apiSuccess {String} longitude  Longitude of the Favorite
     * @apiSuccess {String} user_id  ID of the User
     */
        .post(function (req, res) {

            var userId = req.params.userId;
            var address = req.body.address;
            var name = req.body.name;
            var latitude = req.body.latitude;
            var longitude = req.body.longitude;
            var placeId = req.body.placeId;
            

            if (!address || !name || !latitude || !longitude || !placeId) {
                res.status(500).send({
                    success: false,
                    error: "adresse, name, latitude, longitude, placeId parameters are required !"
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
                        console.log(placeId);
                        Favorites.create({
                            address: address,
                            name: name,
                            latitude: latitude,
                            longitude: longitude,
                            user_id: userId,
                            place_id: placeId
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

    /**
     * @api {GET} /users/:userId/interests/favorites Favorites Interests
     * @apiName GET Favorites
     * @apiGroup Interests
     *
     * @apiSuccess {Number} id  ID of the Favorite
     * @apiSuccess {String} address  Address of the Favorite
     * @apiSuccess {String} name  Name of the Favorite
     * @apiSuccess {String} latitude  Latitude of the Favorite
     * @apiSuccess {String} longitude  Longitude of the Favorite
     * @apiSuccess {String} user_id  ID of the User
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

    /**
     * @api {DELETE} /interests/favorites/:favoriteId Delete favorite interests
     * @apiName DELETE Favorite
     * @apiGroup Interests
     *
     * @apiSuccess {BOOL} success  TRUE
     */
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

    /**
     * @api {GET} /users/:userId/interests All interests
     * @apiName All interests by User ID
     * @apiGroup Interests
     *
     * @apiSuccess {Number} id  ID of the User Interest
     * @apiSuccess {Number} interest_id  ID of the Interest
     * @apiSuccess {Number} user_id  ID of the User
     * @apiSuccess {Array} interest  Information of the Interest
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
        /**
         * @api {POST} /users/:userId/interests Interests
         * @apiName Choice Interests by User ID
         * @apiGroup Interests
         *
         * @apiSuccess {Number} id  ID of the User Interest
         * @apiSuccess {Number} interest_id  ID of the Interest
         * @apiSuccess {Number} user_id  ID of the User
         * @apiSuccess {Array} interest  Information of the Interest
         */
        .post (function (req, res) {

            var interests_id = req.body.interests_id;
            var user_id = req.params.userId;

            console.log(interests_id);
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
                    }).then(function (success) {
                        console.log(success);
                    });

                }
                res.status(200).send({
                    "success": true
                });
            }
        })

        .put(function (req, res) {
            var interests_id = req.query.interests_id,
                user_id = req.params.userId;

            if (!interests_id || !user_id || interests_id.length == 0) {
                return res.status(400).send({
                    'success': false,
                    'error': "Interets_id and user_id are required !"
                });
            }

            var interest = null;
            for (var i = 0; i < interests_id.length; i++) {

                var interest = interests_id[i];
                UserInterest.findAll({
                    where: {
                        user_id: user_id,
                        interest_id: interest
                    }
                }).then(function (userInterest) {
                    if (userInterest.length == 0) {
                        UserInterest.create({
                            interest_id: interest,
                            user_id: user_id
                        }).error(function (err) {
                            res.status(500).send({
                                "success": false,
                                "error": err
                            });
                        });
                    } else {
                        console.log('KO');
                    }
                });

            }
            res.status(200).send({
                "success": true
            });

        })

        .delete(function (req, res) {
            var interests_id = req.query.interests_id,
                user_id = req.params.userId;

            if (!interests_id || !user_id) {
                return res.status(400).send({
                    'success': false,
                    'error': "Interets_id and user_id are required !"
                });
            }

            UserInterest.destroy({
                where: {
                    user_id: user_id,
                    interest_id: interests_id
                }
            }).then(function (success) {
                res.status(200).send({
                    success: true,
                    data: success
                });
            }, function (error) {
                res.status(500).send({
                    success: false,
                    error: error
                });
            });
        });
};