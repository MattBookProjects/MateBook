import sqlHelpers from "./sqlHelpers.js";
import tedious from "tedious"


const Connection = tedious.Connection;
const Request = tedious.Request;

export class DBTable {
    constructor(tableName, config){
        this.name = tableName;
        this.config = config
    };

    create(rowObject){
        return new Promise((res, rej) => {
            let error;
            let request = new Request(`INSERT INTO ${this.name} ${sqlHelpers.getSqlInsertStatementFromObject(rowObject)}`, (err, rowCount, rows) => {
                //console.log('ROW COUNT ON CREATE: ' + rowCount);
                //console.log('ROW 0' + rows)
                if (err) {
                    error = true;
                } else {
                   // user = rows;
                }
            });
            let connection = new Connection(this.config);
            request.on('requestCompleted', () => {
                connection.close();
                if (error) {
                    rej('error');
                }
                else{
                    res(true);
                }
            });
            connection.connect(() => {
                connection.execSql(request)});
        });
    }

    exists(rowObject){
        return new Promise((res, rej) => {
            let result, error;
            const request = new Request(`SELECT * FROM ${this.name} WHERE ${sqlHelpers.getSqlConditionalFromObject(rowObject)}`, (err, rowCount, rows) => {
                if (err) {
                    error = err;
                    console.log('ERROR: ' + err);
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
    }

    get(rowObject){
        return new Promise((res, rej) => {
            let result, error;
            const request = new Request(`SELECT * FROM ${this.name} WHERE ${sqlHelpers.getSqlConditionalFromObject(rowObject)}`, (err, rowCount, rows) => {
                if (err) {
                    error = err;
                }
                if (rowCount === 1) {
                    result = sqlHelpers.convertSqlRowToObject(rows[0]);
                }
                else {
                    error = true;
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
    }
    getAll(rowObject){
        return new Promise((res, rej) => {
            let result, error;
            const request = new Request(`SELECT * FROM ${this.name} WHERE ${sqlHelpers.getSqlConditionalFromObject(rowObject)}`, (err, rowCount, rows) => {
                if (err) {
                    error = err;
                }
                if (rowCount > 0) {
                    result = rows.map(row => sqlHelpers.convertSqlRowToObject(row));
                }
                else {
                    error = true;
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
    }

    delete(rowObject){
        return new Promise((res, rej) => {
            let result, error;
            const request = new Request(`DELETE FROM ${this.name} WHERE ${sqlHelpers.getSqlConditionalFromObject(rowObject)}`, (err, rowCount, rows) => {
                if (err) {
                    error = err;
                }
                else {
                    result = true;
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
    }

    update(conditions, updated){
        return new Promise((res, rej) => {
            let result, error;
            const request = new Request(`UPDATE ${this.name} SET ${sqlHelpers.getSqlUpdateStatementFromObject(updated)} WHERE ${sqlHelpers.getSqlConditionalFromObject(conditions)}`, (err, rowCount, rows) => {
                if (err) {
                    error = err;
                }
                else {
                    result = true;
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
    }
}