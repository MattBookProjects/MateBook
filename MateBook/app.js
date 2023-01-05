//const express = require("express");
//const bodyParser = require("body-parser");
//const Connection = require("tedious").Connection;
//const Request = require("tedious").Request;

import express from 'express';
import bodyParser from 'body-parser';
import tedious from 'tedious';

const Connection = tedious.Connection;
const Request = tedious.Request;


function App(databaseConfig){
    const app = express();
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    //const distDir = __dirname + "/dist";
    //app.use(express.static(distDir));

    const databaseConnection = new Connection(databaseConfig);

    app.get("/api/status", (req, res) => {
        res.status(200).json({ status: "UP"});
    });

    app.post("/api/register", (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let registerRequest = new Request(`INSERT INTO USERS (username, password_hash, first_name, last_name) VALUES (${username}, ${password_hash}, ${first_name}, ${last_name})`, (err, rowCount, rows) => {
            if ( err ) {
                res.send(500).json({ message: "Internal server error" });
            } else {
                res.send(201);
            }
        })
        let checkUsernameAvailableRequest = new Request(`SELECT COUNT (id) AS count FROM TABLE USERS WHERE username=${username}`, (err, rowCount, rows) => {
            if ( err ) {
                res.status(500).json({ message: "Internal server error" });
            } else {
                if ( rows[0].count > 0 ) {
                    res.status(401).json({ message: "Username already taken" });
                } else {
                    databaseConnection.execSql(registerRequest);
                }
            }
        });
        databaseConnection.execSql(checkUsernameAvailableRequest);
    });

    app.post("/api/login", (req, res) => {

    });

    app.delete("/api/logout", (req, res) => {
    
    });

    app.post("/posts", (req, res) => {

    });

    app.get("/posts", (req, res) => {

    });

    return app;
};

export default App;







/*
const databaseConfig = {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        userName: 'cieniu316',
        password: '25V8@rgr662'
      }
    },
    options: {
        encrypt: true,
        database: 'MateBook',
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true
    }
}



const server = app.listen(process.env.PORT || 8080, () => {
    const port =  server.address().port;
    console.log("Server now running on port", port);
});*/












