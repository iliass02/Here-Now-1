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