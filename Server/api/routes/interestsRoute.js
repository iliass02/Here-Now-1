//SELECT * FROM interest

var mysql = require("mysql");

module.exports = function(router, connection) {

    router.route('/interests-category')
        .get(function (req, res) {

            var request = "SELECT * FROM ??";
            var table = ["category_interest"];
            var request = connection.format(request, table);
            connection.query(request, function (err, data) {

                if (err) {
                    res.status(500).send({
                        'success': false,
                        'error': err
                    });
                } else {
                    res.status(200).send({
                        'success': true,
                        'data': data
                    });
                }

            });

        });

    router.route('/interests')
        .get(function (req, res) {

            var request = "SELECT * FROM ??";
            var table = ["interest"];
            var request = connection.format(request, table);
            connection.query(request, function (err, data) {

                if (err) {
                    res.status(500).send({
                        'success': false,
                        'error': err
                    });
                } else {
                    res.status(200).send({
                        'success': true,
                        'data': data
                    });
                }

            });

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

                    var request = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
                    var table = ['users_interest', 'interest_id', 'user_id', interests_id[i], user_id];
                    request = mysql.format(request, table);
                    connection.query(request, function (err) {
                        if (err) {
                            res.status(500).send({
                                "success": false,
                                "error": err
                            });
                        }

                    });

                }
                res.status(200).send({
                    "success": true
                });
            }
        });

    router.route('/interests-category/:category_id')
        .get(function (req, res) {

            var category_id = req.params.category_id;

            var request = "SELECT * FROM ?? WHERE ?? = ?";
            var table = ['interest', 'category_id', category_id];
            var request = connection.format(request, table);
            connection.query(request, function (err, data) {

                if (err) {
                    res.status(500).send({
                        'success': false,
                        'error': err
                    });
                } else {
                    if (data[0] != "undefined") {
                        res.status(200).send({
                            'success': true,
                            'data': data
                        });
                    } else {
                        res.status(500).send({
                            'success': false,
                            'error': 'Interest not find in this category'
                        });
                    }
                }

            });

        });


};