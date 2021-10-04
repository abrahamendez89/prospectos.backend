"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const appconfig = require('./appconfig');
const Accesos_1 = require("./Accesos");
const appconfig_1 = require("./appconfig");
app.use(cors());
//configurando la codificación del body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    //res.status(err.status || 500);
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    //validando acceso
    if (req.originalUrl == "/login") {
        return next();
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Request Token " + token);
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, appconfig_1.Appconfig.secret, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        console.log("Request Payload");
        req.user = user;
        console.log(req.user);
        let acceso = new Accesos_1.Accesos();
        acceso.Evaluar(req.user.usuario_rol, req.originalUrl, req.method).then((respuesta) => {
            if (respuesta) {
                next();
                return;
            }
            return res.sendStatus(403);
        });
    });
});
app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    console.log({ "mensaje": "Error al llamar al servicio.", "detalles": err });
    res.json({ "resultado": 500, "mensaje": "Error al llamar al servicio.", "detalles": err });
    res.end();
});
var routes = require('./ControllersList'); //importing route
routes(app); //register the route
//iniciando el servidor en el puerto 3000
var port = 3000;
app.listen(port, function () {
    console.log("Servidor iniciado correctamente por el puerto: " + port);
});
