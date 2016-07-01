var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    /*
    Model for ORM
     */
    var users = require('../../models/users')(connection, Sequelize);
    var opinions = require('../../models/opinions')(connection, Sequelize);

    router.route('/users')
        /*
        GET all users
         */
        .get(function (req, res) {

            users.findAll().then(function (users) {
               res.status(200).send({
                   success: true,
                   data: users
               });
            });

        });

    router.route('/users/:user')
        /*
        GET user info by userId
         */
        .get(function (req, res) {
            var user  = req.params.user;

            users.findOne({
                where: {
                    $or: [{
                        id: user
                    }, {
                        login: user
                    }]
                }
            }).then(function (user) {
                res.status(200).send({
                    success: true,
                    data: user
                });
            })

        })

    router.route('/users/:login')
        /*
        GET user info by login
         */
        .get(function (req, res) {
            var login  = req.params.login;

            users.findOne({
                where: {
                    login: login
                }
            }).then(function (user) {
                res.status(200).send({
                    success: true,
                    data: user
                });
            })

        })

    router.route('/users/:UserId/:opinion')
        /*
        POST opinion by UserId
         */
         .post(function(req, res){
            var UserId = req.params.UserId;
            var InterestId = req.body.InterestId;
            var Content = req.body.Content;

            if (!UserId || !InterestId || !Content){
                res.status(500).send({
                    success: false,
                    error: "UserId, InterestId or Content are requiered" 
                })
            }
            opinions.create({
                user_id: UserId,
                interest_id: InterestId,
                content: Content,
                date_post: Sequelize.NOW
            }).then(function(success){
                res.status(200).send({ 
                    success: true, 
                    data: success
                });
            }, function(error){
                res.status(500).send({
                    success: false,
                    error: error
                });
            });
         })

}