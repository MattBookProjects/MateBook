import tedious from 'tedious';
import fetch from 'file-fetch';
import * as utils from './utils.js';

const Connection = tedious.Connection;
const Request = tedious.Request;
/*
const config = {
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

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('no error');
    }
})

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        getUsers();
    }
});

getUsers = () => {
    let request = new Request("SELECT * FROM USERS", (err, rowCount, rows) => {
        if (err) {
            console.log(err);
        } else {
            rows.forEach((row) => {
                console.log(row);
            })
        }
    });
    connection.execSql(request);
}*/

/*
const config = {
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

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('no error');
    }
})

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        getUsers();
    }
});

getUsers = () => {
    let request = new Request("SELECT * FROM USERS", (err, rowCount, rows) => {
        if (err) {
            console.log(err);
        } else {
            rows.forEach((row) => {
                console.log(row);
            })
        }
    });
    connection.execSql(request);
}*/
class Database {
    constructor(config) {
        console.log(config);
        this.config = config;
        this.createUser = (userObject) => {
            return new Promise((res, rej) => {
                let user, error;
                let request = new Request(`INSERT INTO USERS ${utils.getSqlInsertStatementFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        console.log('err');
                        error = true;
                    } else {
                        console.log('no err');
                        retUser = rows;
                    }
                });
                console.log('executing');
                let connection = new Connection(this.config);
                request.on('requestCompleted', () => {
                    connection.close();
                    if (error) {
                        console.log('err')
                        rej('error');
                    }
                    res(retUser);
                });
                request.on('error', (err) => {
                    console.log(err);
                })
                console.log('executin2');
                connection.connect(() => {
                    console.log('execsql');
                    connection.execSql(request)});
            });
        }
        this.userExists = (userObject) => {
            return new Promise((res, rej) => {
                let result, error;
                const request = new Request(`SELECT id FROM USERS WHERE ${utils.getSqlConditionalFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = true;
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
                        rej('error');
                    } else {
                        res(result);
                    }
                });
                connection.connect(() => connection.execSql(request));
            });
        };

        this.createSession = (sessionObject) => {
            return new Promise((res, rej) => {
                let error, result;
                const request = new Request(`INSERT INTO ACTIVE_SESsION ${utils.getSqlInsertStatementFromObject(sessionObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = true;
                        console.log(err);
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
                const request = new Request(`SELECT id FROM ACTIVE_SESSION WHERE ${utils.getSqlConditionalFromObject(sessionObject)}`, (err, rowCount, rows) => {
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
            return new Promise((res, rep) => {
                let result, error;
                const request = new Request(`SELECT * FROM USERS WHERE ${utils.getSqlConditionalFromObject(userObject)}`, (err, rowCount, rows) => {
                    if (err) {
                        error = err;
                    } else if (rowCount !== 1){
                        error = 'Error: multiple results';
                    } else {
                        result = utils.convertSqlRowToObject(rows[0]);
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
            return new Promise((res, rep) => {
                let result, error;
                const request = new Request(`DELETE FROM ACTIVE_SESSION WHERE ${utils.getSqlConditionalFromObject(sessionObject)}`, (err, rowCount, rows) => {
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
