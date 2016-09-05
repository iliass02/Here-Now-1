var mysql = require("mysql");
var Sequelize = require('sequelize'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function(router, connection) {
    /*
    Model for ORM
     */
    var users = require('../../models/users')(connection, Sequelize);
    var opinions = require('../../models/opinions')(connection, Sequelize);
    var news_feed = require('../../models/news_feed')(connection, Sequelize);


    /**
     * @api {GET} /users Get Users
     * @apiName Users
     * @apiGroup User
     *
     * @apiSuccess {Number} id User id.
     * @apiSuccess {String} login  Login of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} password  Password Hash of the User.
     */
    router.route('/users')
        .get(function (req, res) {

            users.findAll().then(function (users) {
               res.status(200).send({
                   success: true,
                   data: users
               });
            });

        });


    /**
     * @api {GET} /users/:id Get User by Id
     * @apiName User by ID
     * @apiGroup User
     *
     * @apiSuccess {Number} id User id.
     * @apiSuccess {String} login  Login of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} password  Password Hash of the User.
     */
    router.route('/users/:user')
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

        .put(function (req, res) {
            var userId = req.params.user,
                login = req.query.login,
                email = req.query.email,
                password = req.query.password,
                firstname = req.query.firstname,
                lastname = req.query.lastname,
                sexe = req.query.sexe,
                birth_day = req.query.birth_day;

            console.log(req.query);

            if (!userId)
                return res.status(400).send({
                    success: false,
                    error: "userId is required !"
                });

            users.findAll({
                where: {
                    id: !userId,
                    $or: [{
                        email: email
                    }, {
                        login: login
                    }]
                }
            }).then(function (user) {
               if (user.length > 0)
                   return res.status(409).send({
                       success: false,
                       error: "login or email already used !",
                       user: user
                   });

                users.findById(userId).then(function (user) {
                    if (user == null)
                        return res.status(401).send({
                            success: false,
                            error: "user not found !"
                        });

                    user.updateAttributes({
                        login: login,
                        email: email,
                        password: bcrypt.hashSync(password),
                        firstname: firstname,
                        lastname: lastname,
                        sexe: sexe,
                        birth_date: birth_day
                    }).then(function (success) {
                        return res.status(200).send({
                            success: true,
                            data: success
                        });
                    }, function (error) {
                        return res.status(500).send({
                            success: false,
                            error: error
                        });
                    })
                }, function (error) {
                    return res.status(500).send({
                        success: false,
                        error: error
                    });
                });

            }, function (error) {
                return res.status(500).send({
                    success: false,
                    error: error
                });
            });

        });


    /**
     * @api {GET} /users/:login Get Users by Login
     * @apiName User by Login
     * @apiGroup User
     *
     * @apiSuccess {Number} id User id.
     * @apiSuccess {String} login  Login of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} password  Password Hash of the User.
     */
    router.route('/users/:login')
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
    /**
     * @api {POST} /users/:UserId/opinion Post User's Opinion
     * @apiName User's Opinion
     * @apiGroup Opinion
     *
     * @apiParam {Number} InterestId ID of the Interest
     * @apiParam {String} Content Content of the Interest
     *
     * @apiSuccess {Number} id opinion ID.
     * @apiSuccess {String} user_id  ID of the User.
     * @apiSuccess {String} interest_id  ID of the Interest.
     * @apiSuccess {String} content  Content of the Opinion.
     * @apiSuccess {String} date_post  Date of the Opinion's post.
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
         })


         /**
          * @api {GET} /users/:UserId/opinion Get User's Opinion
          * @apiName User's Opinion
          * @apiGroup Opinion
          *
          * @apiParam {Number} UserId ID of the User
          *
          * @apiSuccess {Number} id opinion ID.
          * @apiSuccess {String} user_id  ID of the User.
          * @apiSuccess {String} interest_id  ID of the Interest.
          * @apiSuccess {String} content  Content of the Opinion.
          * @apiSuccess {String} date_post  Date of the Opinion's post.
          */
        .get(function (req, res) {
            var UserId = req.params.UserId;

            if (!UserId)
                return res.status(500).send({
                    success: false,
                    error: "UserId is required"
                });

            opinions.findAll({
                where: {
                    user_id: UserId
                },
                order: 'date_post DESC',
            }).then(function (UsersOpinions) {
                res.status(200).send({
                    success: true,
                    data: UsersOpinions
                });
            }, function (error) {
                res.status(500).send({
                    success: false,
                    error: error
                });
            });

        });

    /**
     * @api {GET} opinions/interest/:InterestId Get User's Opinion by Interest ID
     * @apiName User's Opinion
     * @apiGroup Opinion
     *
     * @apiSuccess {Number} id opinion ID.
     * @apiSuccess {String} user_id  ID of the User.
     * @apiSuccess {String} interest_id  ID of the Interest.
     * @apiSuccess {String} content  Content of the Opinion.
     * @apiSuccess {String} date_post  Date of the Opinion's post.
     * @apiSuccess {Array} user  User information.
     */
    router.route('/opinions/interest/:InterestId')
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


    /**
     * @api {GET} /news-feed Get All News Feed
     * @apiName News Feed
     * @apiGroup News Feed
     *
     * @apiSuccess {Number} id opinion ID.
     * @apiSuccess {String} user_id  ID of the User.
     * @apiSuccess {String} content  Content of the Opinion.
     * @apiSuccess {String} date_post  Date of the Opinion's post.
     * @apiSuccess {Array} user  User information.
     */
    router.route('/news-feed')
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
    /**
     * @api {POST} /users/:UserId/news-feed Post News Feed
     * @apiName Post News Feed
     * @apiGroup News Feed
     *
     * @apiParam {String} Content Content of the news
     *
     * @apiSuccess {Number} id News Feed ID.
     * @apiSuccess {String} user_id  ID of the User.
     * @apiSuccess {String} content  Content of the news.
     * @apiSuccess {String} date_post  Date of the Opinion's post.
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

        /**
         * @api {GET} /users/:UserId/news-feed Get News Feed by user ID
         * @apiName Get News Feed
         * @apiGroup News Feed
         *
         * @apiParam {Number} UserID ID of the User
         *
         * @apiSuccess {Number} id News Feed ID.
         * @apiSuccess {String} user_id  ID of the User.
         * @apiSuccess {String} content  Content of the news.
         * @apiSuccess {String} date_post  Date of the Opinion's post.
         */
        .get(function (req, res) {
            var UserId = req.params.UserId;

            if (!UserId) {
                return res.status(500).send({
                    success: false,
                    error: "UserId is required"
                });
            }
            news_feed.findAll({
                where: {
                    user_id: UserId
                },
                order: 'date_post DESC'
            }).then(function (usersNewsFeed) {
                res.status(200).send({
                    success: true,
                    data: usersNewsFeed
                });
            }, function (error) {
                res.status(500).send({
                    success: false,
                    error: error
                });
            });
        })
};