var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    //model
    var users = require('../../models/users')(connection, Sequelize);

    router.route('/users')
        .get(function (req, res) {

            users.findAll().then(function (users) {
               res.status(200).send({
                   success: true,
                   data: users
               });
            });

        });

    router.route('/users/:userId')
        .get(function (req, res) {
            var userId  = req.params.userId;

            users.findOne({
                where: {
                    id: userId
                }
            }).then(function (user) {
                res.status(200).send({
                    success: true,
                    data: user
                });
            })

        })

}