import redis = require('redis');
import util = require('util');
import { Appconfig} from '../appconfig';

export class RedisDB{
    client:any;

    public connect(){
        //this.client = redis.createClient({host: Appconfig.redisHost, port: Appconfig.redisPort});
        console.log("connect");
        this.client = redis.createClient({
            url: 'redis://'+Appconfig.redisHost+':'+Appconfig.redisPort,
          });
    }
    public close(){
        this.client.close();
    }
    public set(key:String, value:String){
        this.client.set(key, value);
    }
    public get(key:String){
        //this.client.get(key, function(err, reply) {
        //    console.log(reply);
        //});
        let getRedis = util.promisify(this.client.get).bind(this.client);

        getRedis.then(((err, reply)=>{
            return reply;
        })).catch();
        
        
    }
}