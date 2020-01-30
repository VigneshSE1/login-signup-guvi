const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: '',
    database: 'userlist'
});



app.post('/register', function (req, res) {

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    let emailcheck = `SELECT COUNT(*) AS count FROM mytable1 WHERE email = ? `

    emailcheck = mysql.format(emailcheck, req.body.email);

    connection.query(emailcheck, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result[0].count > 0) {
                res.json({
                    message: "error",
                })
            }
            else {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        let data = {
                            email: req.body.email,
                            password: hash,
                        }
                        console.log(data);
                        let sql = `INSERT INTO mytable1 SET ?`;
                        sql = mysql.format(sql, data);

                        connection.query(sql, function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log(result);
                                res.json({
                                    message: "acess",
                                })
                                connection.end(function (err) {
                                    if (err) throw err;
                                    console.log("db closed") // The connection is terminated now
                                });
                            }
                        })
                    })
                })
            }
        }


    })

})


app.post('/login', function (req, res) {

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    let checkdata = {
        email: req.body.email,
        password: req.body.password,
    }

    let emailQuery = `SELECT COUNT(*) AS count FROM mytable1 WHERE email = ? `

    emailQuery = mysql.format(emailQuery, req.body.email);

    connection.query(emailQuery, function (err, isExist) {
        if (err) {
            throw err;
        } else {
            if (isExist[0].count > 0) {
                console.log(isExist);
                let passwordquery = `SELECT password  FROM mytable1 WHERE email = ? `

                passwordquery = mysql.format(passwordquery, req.body.email);

                connection.query(passwordquery, function (err, result) {

                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(result[0].password);

                        bcrypt.compare(req.body.password, result[0].password, function (err, valid) {
                            if (valid) {
                                console.log(valid);
                                res.json({
                                    message: "susscess",
                                })
                            }
                            else {
                                console.log(valid);
                                res.json({
                                    message: "notsucee",
                                })
                            }

                        })
                        connection.end(function (err) {
                            if (err) throw err;
                            console.log("db closed") // The connection is terminated now
                        });
                    }
                })

            } else {

            }
        }
    })


})


app.listen(3000);