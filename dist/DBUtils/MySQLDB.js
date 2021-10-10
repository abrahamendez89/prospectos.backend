"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const appconfig_1 = require("../appconfig");
class MySQLDB {
    constructor() {
        this.connection = mysql.createConnection({
            host: appconfig_1.Appconfig.host,
            user: appconfig_1.Appconfig.user,
            password: appconfig_1.Appconfig.password,
            database: appconfig_1.Appconfig.database
        });
    }
    open() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                console.log("mysql.open()");
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    beginTran() {
        return new Promise((resolve, reject) => {
            this.connection.beginTransaction(function (err) {
                console.log("mysql.begintran()");
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    commitTran(results) {
        return new Promise((resolve, reject) => {
            this.connection.commit((err) => {
                console.log("mysql.commit()");
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
    rollback() {
        return new Promise((resolve, reject) => {
            this.connection.rollback((err) => {
                console.log("mysql.rollback()");
                if (err) {
                    return reject(err);
                }
                reject();
            });
        });
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                console.log("mysql.query('" + sql + "')");
                //if ( err )
                //    return this.rollback();
                try {
                    var resultArray = JSON.parse(JSON.stringify(rows));
                    resolve(resultArray);
                }
                catch (ex) {
                    return reject(ex);
                }
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                console.log("mysql.close()");
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
exports.default = MySQLDB;
