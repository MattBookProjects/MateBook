import tedious from 'tedious';
import fetch from 'file-fetch';
import sqlHelpers from './app/utils/sqlHelpers.js';

const Connection = tedious.Connection;
const Request = tedious.Request;

class Database {
    constructor(config) {
        this.config = config;
        this.createUser = (userObject) => {
            return new Promise((res, rej) => {
                let user, error;
                let request = new Request(`INSERT INTO USERS ${sqlHelpers.getSqlInsertStatementFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = true;
                        //console.log(err);
                    } else {
                        user = rows;
                    }
                });
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        rej('error');
                    }
                    res(user);
                });
                connection.connect(() => {
                    connection.execSql(request)});
            });
        }
        this.userExists = (userObject) => {
            return new Promise((res, rej) => {
                let result, error;
                const request = new Request(`SELECT id FROM USERS WHERE ${sqlHelpers.getSqlConditionalFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = err;
                    }
                    if (rowCount > 0) {
                        result = true;
                    }
                    else {
                        result = false;
                    }
                });
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error){
                        rej(error);
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => {
                    connection.execSql(request)});
            });
        };

        this.createSession = (sessionObject) => {
            return new Promise((res, rej) => {
                let error, result;
                const request = new Request(`INSERT INTO ACTIVE_SESsION ${sqlHelpers.getSqlInsertStatementFromObject(sessionObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = true;
                    } else if (rowCount > 0) {
                        result = rows;
                    }
                });
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        rej('error');
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => connection.execSql(request));
            });
        };

        this.sessionExists = (sessionObject) => {
            return new Promise((res, rej) => {
                let error, result;
                const request = new Request(`SELECT id FROM ACTIVE_SESSION WHERE ${sqlHelpers.getSqlConditionalFromObject(sessionObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = true;
                        console.log(err);
                    } else if ( rowCount > 0 ){
                        result = true;
                    } else {
                        result = false;
                    }
                });
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        rej('error');
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => connection.execSql(request));
            });
        };

        this.getUser = (userObject) => {
            return new Promise((res, rej) => {
                let result, error;
                const request = new Request(`SELECT * FROM USERS WHERE ${sqlHelpers.getSqlConditionalFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = err;
                    } else if (rowCount !== 1){
                        error = 'Error: multiple results';
                    } else {
                        result = sqlHelpers.convertSqlRowToObject(rows[0]);
                    }
                })
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        rej(error);
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => connection.execSql(request)); 
            });
        };

        this.deleteSession = (sessionObject) => {
            return new Promise((res, rej) => {
                let result, error;
                const request = new Request(`DELETE FROM ACTIVE_SESSION WHERE ${sqlHelpers.getSqlConditionalFromObject(sessionObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = err;
                    } else {
                        result = true;
                    }
                });
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        rej(error);
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => connection.execSql(request));
            });
        }
    }
}

const config = await fetch('./database.config.json').then(response => response.json());

const database = new Database(config);

export default database;
