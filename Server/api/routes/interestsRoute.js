//SELECT * FROM interest

var mysql = require("mysql");

module.exports = function(router, connection) {

    router.route('/all-interests')
        .get(function (req, res) {

            var request = "SELECT * FROM interest";
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

};