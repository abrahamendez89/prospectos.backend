const mysql = require( 'mysql' );
import { Appconfig } from '../appconfig'

export default class MySQLDB {
    connection:any;
    constructor() {
        this.connection = mysql.createConnection({
            host     : Appconfig.host,
            user     : Appconfig.user,
            password : Appconfig.password,
            database : Appconfig.database
        });
    }
    open(){
        return new Promise( ( resolve:any, reject: any ) => {
            this.connection.connect((err:any) => {
                console.log("mysql.open()");
                if (err) { return reject( err ); }
                resolve();
            });
        });
    }
    beginTran() {
        return new Promise( ( resolve:any, reject: any ) => {
            this.connection.beginTransaction(function(err:any) {
                console.log("mysql.begintran()");
                if (err) { return reject( err ); }
                resolve();
            });
        });
    }
    commitTran(results:any) {
        return new Promise( ( resolve:any, reject: any ) => {
            this.connection.commit((err:any) => {
                console.log("mysql.commit()");
                if (err) { return reject( err ); }
                resolve(results);
            });
        });
    }
    rollback() {
        return new Promise( ( resolve:any, reject: any ) => {
            this.connection.rollback((err:any) => {
                console.log("mysql.rollback()");
                if (err) { return reject( err ); }
                reject();
            });
        });
    }
    query( sql:any, args:any ) {
        return new Promise( ( resolve:any, reject: any ) => {
            this.connection.query( sql, args, ( err: any, rows: any ) => {
                console.log("mysql.query('"+sql+"')");
                //if ( err )
                //    return this.rollback();
                try{
                    var resultArray = JSON.parse(JSON.stringify(rows));
                    resolve( resultArray );
                }
                catch(ex)
                {
                    return reject( ex );
                }
            });
        });
    }
    close() {
        return new Promise( ( resolve: any, reject: any ) => {
            this.connection.end( (err:any) => {
                console.log("mysql.close()");
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}