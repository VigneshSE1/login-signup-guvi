const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require("bcrypt");
const saltRounds = 5;
const fs = require('fs');

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
        } else {
            if (result[0].count > 0) {
                res.json({
                    message: "emailExist",
                })
            } else {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        let data = {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: hash,
                            gender: req.body.gender,
                            dob: req.body.dob,

                        }
                        console.log(data);
                        let sql = `INSERT INTO mytable1 SET ?`;
                        sql = mysql.format(sql, data);

                        connection.query(sql, function (err, result) {
                            if (err) {
                                throw err;
                            } else {
                                console.log(result);

                                fs.readFile('userdetails.json', (err, data) => {
                                    if (err) throw err;

                                    let userArray = JSON.parse(data);

                                    let userData = {
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname,
                                        email: req.body.email,
                                        gender: req.body.gender,
                                        dob: req.body.dob,
                                    }
                                    console.log(userData);
                                    userArray.push(userData);

                                    let data2 = JSON.stringify(userArray);

                                    fs.writeFileSync("userdetails.json", data2)

                                });

                                res.json({
                                    message: "registerSuccess",
                                })
                                connection.end(function (err) {
                                    if (err) throw err;
                                    console.log("db closed")
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
                    } else {
                        console.log(result[0].password);

                        bcrypt.compare(req.body.password, result[0].password, function (err, valid) {
                            if (valid) {
                                console.log(valid);
                                res.status(200).json({
                                    message: "loginSuccess",
                                })
                            } else {
                                console.log(valid);
                                res.json({
                                    message: "loginNotSuccess",
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
                res.json({
                    message: "emailNotExist",
                })
            }
        }
    })


})

app.post('/userdetails', function (req, res) {

    var user = {
        email: req.body.email,
    }
    console.log(user);

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    let userQuery = `SELECT firstname,lastname,dob,gender FROM mytable1 WHERE email = ?`

    userQuery = mysql.format(userQuery, user.email);

    connection.query(userQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            res.json({
                message: "success",
                data: result,
            });
            connection.end(function (err) {
                if (err) throw err;
                console.log("db closed");
            });
        }

    })

})

app.post('/edituserdetails', function (req, res) {

    var user = {

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        email: req.body.email,
    }
    console.log(user);

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    let edituserQuery = `UPDATE mytable1 SET firstname = ? ,lastname = ?, gender = ? ,dob = ? WHERE email = ? `

    //edituserQuery = mysql.format(edituserQuery, user);

    connection.query(edituserQuery, [user.firstname, user.lastname, user.gender, user.dob, user.email], function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);

            fs.readFile('userdetails.json', (err, data) => {
                if (err) throw err;

                let userArray = JSON.parse(data);

                let userData = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    gender: req.body.gender,
                    dob: req.body.dob,
                }

                userArray.map(function (element) {

                    if (element["email"] == userData["email"]) {
                        element["firstname"] = userData.firstname,
                            element["lastname"] = userData.lastname,
                            element["gender"] = userData.gender,
                            element["dob"] = userData.dob
                    }

                })

                let data2 = JSON.stringify(userArray);

                fs.writeFileSync("userdetails.json", data2)

            });


            res.json({
                message: "success",
                data: result,
            });
            connection.end(function (err) {
                if (err) throw err;
                console.log("db closed");
            });
        }

    })

})




app.listen(3000);