import database from '../database.js';
import * as utils from '../utils.js';

export default async function register(req, res){
    let username, password, first_name, last_name;
    try {
        username = utils.validateStringInput(req.body.username);
        password = utils.validateStringInput(req.body.password);
        first_name = utils.validateStringInput(req.body.first_name);
        last_name = utils.validateStringInput(req.body.last_name);
    }
    catch {
        res.status(400).json({message: 'Invalid input'});
        return;
    }

    let password_hash = utils.hashPassword(password);
    let userExists; 
    try {
        userExists = await database.userExists({username: username});
    }
    catch {
        res.status(500).json({message: 'Interenal sever error'});
        return;
    }
    if (userExists) {
        res.status(400).json({message: "Username already taken"});
    } else {
        let user;
        try {
            user = await database.createUser({username: username, password_hash: password_hash, first_name: first_name, last_name: last_name});
        }
        catch {
            res.status(500).json('Internal server error');
            return;
        }
        res.status(201).json({id: user.id})
    }
}
