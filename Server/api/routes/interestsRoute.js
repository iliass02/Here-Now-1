var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    //model
    var interest = require('../../models/interest')(connection, Sequelize);
    var userInterest = require('../../models/users_interest')(connection, Sequelize);

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


};