import database from '../database.js';
import validators from '../utils/validators.js';
import authentication from '../utils/authentication.js';

export default async function register(req, res){
    let username, password, first_name, last_name;
    try {
        username = validators.validateStringInput(req.body.username);
        password = validators.validateStringInput(req.body.password);
        first_name = validators.validateStringInput(req.body.first_name);
        last_name = validators.validateStringInput(req.body.last_name);
    }
    catch {
        res.status(400).json({message: 'Invalid input'});
        return;
    }

    let password_hash = authentication.hashPassword(password);
    let userExists; 
    try {
        userExists = await database.userExists({username: username});
    }
    catch {
        res.status(500).json({message: 'Internal server error'});
        return;
    }
    if (userExists) {
        res.status(409).json({message: "Username already taken"});
    } else {
        let user;
        try {
            user = await database.createUser({username: username, password_hash: password_hash, first_name: first_name, last_name: last_name});
        }
        catch {
            res.status(500).json({message: 'Internal server error'});
            return;
        }
        res.status(201);
    }
}
