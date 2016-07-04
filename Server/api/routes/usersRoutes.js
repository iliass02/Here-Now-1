var mysql = require("mysql");
var Sequelize = require('sequelize');

module.exports = function(router, connection) {
    /*
    Model for ORM
     */
    var users = require('../../models/users')(connection, Sequelize);
    var opinions = require('../../models/opinions')(connection, Sequelize);
    var news_feed = require('../../models/news_feed')(connection, Sequelize);

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

        });

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

        });

    router.route('/users/:UserId/opinion')
        /*
        POST opinion by UserId
         */
         .post(function(req, res){
            var UserId = req.params.UserId;
            var InterestId = req.body.InterestId;
            var Content = req.body.Content;

            if (!UserId || !InterestId || !Content){
                return res.status(500).send({
                    success: false,
                    error: "UserId, InterestId and Content are required"
                })
            }
            opinions.create({
                user_id: UserId,
                interest_id: InterestId,
                content: Content,
                date_post: new Date().toJSON()
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
         });

         router.route('/opinions/interest/:InterestId')
        /*
        GET opinion by InterestId
         */
         .get(function(req, res){
            var InterestId = req.params.InterestId;

            if (!InterestId){
                return res.status(500).send({
                    success: false,
                    error: "InterestId is required"
                })
            }
             //LEFT JOIN
             users.hasMany(opinions, {foreignKey: 'user_id'});
             opinions.belongsTo(users, {foreignKey: 'user_id'});

            opinions.findAll({
                where: {
                    interest_id : InterestId
                },
                order: 'date_post DESC',
                include: [users]
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
         });

         router.route('/news-feed')
        /*
        GET all message
         */
        .get(function (req, res) {
            //LEFT JOIN
            users.hasMany(news_feed, {foreignKey: 'user_id'});
            news_feed.belongsTo(users, {foreignKey: 'user_id'});

            news_feed.findAll({
                order: 'date_post DESC',
                include: [users]
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
        });

        router.route('/users/:UserId/news-feed')
        /*
        POST message by UserId
         */
        .post(function (req, res) {
            var UserId = req.params.UserId;
            var Content = req.body.Content;

            if (!UserId || !Content) {
                 return res.status(500).send({
                    success: false,
                    error: "UserId and Content is required"
               });
            }
            news_feed.create({
                user_id: UserId,
                content: Content,
                date_post: new Date().toJSON()
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