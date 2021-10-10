"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDB = void 0;
const redis = require("redis");
const util = require("util");
const appconfig_1 = require("../appconfig");
class RedisDB {
    connect() {
        //this.client = redis.createClient({host: Appconfig.redisHost, port: Appconfig.redisPort});
        console.log("connect");
        this.client = redis.createClient({
            url: 'redis://' + appconfig_1.Appconfig.redisHost + ':' + appconfig_1.Appconfig.redisPort,
        });
    }
    close() {
        this.client.close();
    }
    set(key, value) {
        this.client.set(key, value);
    }
    get(key) {
        //this.client.get(key, function(err, reply) {
        //    console.log(reply);
        //});
        let getRedis = util.promisify(this.client.get).bind(this.client);
        getRedis.then(((err, reply) => {
            return reply;
        })).catch();
    }
}
exports.RedisDB = RedisDB;
