var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(router, connection) {

    router.route("/login")
        // get all clients
        .post(function(req, res) {

            var login = req.body.login;
            var password = req.body.password;
            if(!login || !password ) {
                res.status(500).send({
                    "success": false,
                    "error": "Login and Password are required"
                });
            } else {
                var request = "SELECT * FROM ?? WHERE ?? = ? OR ?? = ?";
                var table = ['users', 'login', login, 'email', login ];
                request = mysql.format(request, table);
                connection.query(request, function(err, data){
                    if (err)
                        res.status(500).send({
                            "success": false,
                            "error": err
                        });
                    else{

                        if (typeof data[0] == 'undefined') {
                            res.status(401).send({
                                "success": false,
                                "error": "Unauthorized : User not found"
                            });
                        } else {
                            if(!bcrypt.compareSync(password, data[0].password)) {
                                res.status(401).send({
                                    "success": false,
                                    "error": "Unauthorized : Password is incorrect"
                                });
                            } else {
                                res.status(200).send({
                                    "success": true,
                                    "data": data
                                })
                            }
                        }
                    }
                });
            }
        })

};
