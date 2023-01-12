import database from './database.js';

const response = await database.getUser({username: 'MattBook'});
console.log(response);