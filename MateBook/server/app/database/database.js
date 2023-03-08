import tedious from 'tedious';
import fetch from 'file-fetch';
import sqlHelpers from './sqlHelpers.js';
import { DBTable } from './dbtable.js';

const Connection = tedious.Connection;
const Request = tedious.Request;

class Database {
    constructor(config) {
        this.userTable = new DBTable('USERS', config);
        this.sessionTable = new DBTable('ACTIVE_SESSION', config);
        this.postTable = new DBTable('POST', config);
        this.config = config;
        this.createUser = (userObject) => {
            return this.userTable.create(userObject);
        }
        this.userExists = (userObject) => {
           return this.userTable.exists(userObject);
        };

        this.createSession = (sessionObject) => {
            return this.sessionTable.create(sessionObject);
        };

        this.sessionExists = (sessionObject) => {
            return this.sessionTable.exists(sessionObject);
        };

        this.getUser = (userObject) => {
            return this.userTable.get(userObject);
        };

        this.deleteSession = (sessionObject) => {
            return this.sessionTable.delete(sessionObject);
        }

        this.createPost = (postObject) => {
            return this.postTable.create(postObject);
        }
    }
}

const config = await fetch('./database.config.json').then(response => response.json());

const database = new Database(config);

export default database;
