//const express = require("express");
//const bodyParser = require("body-parser");
//const Connection = require("tedious").Connection;
//const Request = require("tedious").Request;

import express from 'express';
import bodyParser from 'body-parser';
import tedious from 'tedious';
import cors from 'cors';
import * as utils from '../utils.js';
import register from './register.js';
import login from './login.js';
import logout from './logout.js';
import cookieParser from 'cookie-parser';

const Connection = tedious.Connection;
const Request = tedious.Request;


export default function App(database){
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //const distDir = __dirname + "/dist";
    //app.use(express.static(distDir));

    //const databaseConnection = new Connection(databaseConfig);
    const allowedOrigins = ['http://localhost:8080'];

    app.use(
        cors({
            origin: function(origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg =
                        "The CORS policy for this site does not " +
                        "allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        })
    ); 

    app.get("/api/status", (req, res) => {
        res.status(200).json({ status: "UP"});
    });

    app.post("/api/register", register);
      


    app.post("/api/login", login);

    
  
    app.delete("/api/logout", logout);
    
 

    app.post("/posts", (req, res) => {

    });

    app.get("/posts", (req, res) => {

    });

    return app;
};



















