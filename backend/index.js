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

app.put('/addNewVisitor', (req,res) =>{
    var body = req.body;
    var name = body.name;
    var email = body.email;

    mysqlConnection.query('SELECT a.* From visitor a WHERE email = \'' + email + '\';', (err, rows, fields)=>{
        if (!err) {
            if(rows.length ==0 ){
                mysqlConnection.query('INSERT INTO visitor (name,email,password) VALUES(\'' + name + '\',\'' + email + '\',\'FIREBASE\');', (err, rows, fields)=>{
                    if (!err) {
                        //console.log(rows[0].name);
                        res.send(rows);
                    } else {
                        console.log(err);
                    }
                });
            }
            else{
                console.log("Already exists in Database");
                res.send("Already exists in Database");
            }
        } else {
            console.log(err);
        }
    });
});

app.put('/addNewFavourite', (req,res) =>{
    var body = req.body;
    var artifactName = body.artifactName;
    var email = body.email;

    mysqlConnection.query('INSERT INTO favoriteDetails (dateAdded,visitorNo,artifactName) VALUES(CURRENT_DATE(),(SELECT v.visitorNo FROM visitor v WHERE v.email = \'' + email + '\'),\'' + artifactName + '\');', (err, rows, fields)=>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

app.delete('/deleteFavourite/:email/:artifactName', (req,res) =>{
    var artifactName = req.params.artifactName;
    var email = req.params.email;

    mysqlConnection.query('DELETE FROM favoriteDetails WHERE visitorNo = (SELECT v.visitorNo FROM visitor v WHERE v.email = \'' + email + '\') AND artifactName = \'' + artifactName + '\';', (err, rows, fields)=>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    });
});

// can add more routes below, but routes should be separated 