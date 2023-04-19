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
        };

        this.createPost = (postObject) => {
            return this.postTable.create(postObject);
        };

        this.editPost = (postObject, edited) => {
            return this.postTable.update(postObject, edited)
        }

        this.getPosts = (filter, sortedBy, offset, count, user_id) => {
            console.log('count:' + count)
            return new Promise((res, rej) => {
                let filterString, orderByString;
                if (filter === 'followed'){
                    filterString = `JOIN (SELECT f.follower as follower, f.followed as followed FROM FOLLOW f WHERE f.follower=${user_id}) as f on p.author_id=f.followed`
                }
                else if (filter === 'friends'){
                    filterString = `JOIN (SELECT f.user_id FROM USER_FRIENDSHIP f JOIN (SELECT f.friendship_id as friendship_id FROM USER_FRIENDSHIP f WHERE f.user_id=${user_id}) as ff on f.friendship_id=ff.friendship_id GROUP BY f.user_id) AS f ON p.author.id=f.user_id`
                } else {
                    filterString = ''
                }
                if (sortedBy === 'recent'){
                    orderByString = 'time'
                } else {
                    orderByString = 'likes'
                }
                let error, result;
                const request = new Request(`SELECT p.id as id, p.content as content, p.author_id as author_id, p.time as time, p.is_edited as is_edited, l.likes as likes, u.first_name as author_first_name, u.last_name as author_last_name FROM POST p ${filterString} LEFT JOIN (SELECT post_id, COUNT(id) as likes FROM LIKE_FOR_POST GROUP BY post_id) as l ON p.id=l.post_id JOIN USERS as u on p.author_id=u.id ORDER BY ${orderByString} DESC OFFSET ${offset} ROWS FETCH NEXT ${count} ROWS ONLY`,
                (err, rowCount, rows) => {
                    if (err){
                        console.log(err);
                        error = true;
                    } if (rowCount > 0){
                        result = rows.map(row => sqlHelpers.convertSqlRowToObject(row))
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
            })
        }
    }
}

const config = await fetch('./database.config.json').then(response => response.json());

const database = new Database(config);

export default database;
