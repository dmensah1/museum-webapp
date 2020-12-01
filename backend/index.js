const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Demirmensah12@',
    database: 'museum'
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB Connection Successful.');
    } else {
        console.log('DB connection failed \n Error: ' + JSON.stringify(err));
    }
});

app.listen(3000, () => {
    console.log('Server running at port: 3000')
});

// retrieves all museums
app.get('/museum', (req, res) => {
    mysqlConnection.query('SELECT * FROM Museum;', (err, rows, fields)=>{
        if (!err) {
            //console.log(rows[0].name);
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

<<<<<<< HEAD
=======
// retrieves all artifacts
app.get('/artifacts', (req, res) => {
    mysqlConnection.query('SELECT * From artifact;', (err, rows, fields)=>{
        if (!err) {
            //console.log(rows[0].name);
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// retrieve favourite by email
app.get('/favourites/:email', (req, res) => {
    var email = req.params.email;
    mysqlConnection.query('SELECT f.artifactName FROM favoritedetails f JOIN visitor v on v.visitorNo = f.visitorNo WHERE v.email = \'' + email + '\';', (err, rows, fields)=>{
        if (!err) {
            //console.log(rows[0].name);
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

<<<<<<< HEAD
>>>>>>> parent of 0595c23... Final touches
=======
>>>>>>> parent of 0595c23... Final touches
// can add more routes below, but routes should be separated 