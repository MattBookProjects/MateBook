import database from '../database.js';
import * as utils from '../utils.js';

export default async function login (req, res) {
    let username, password;
    try {
        username = utils.validateStringInput(req.body.username);
        password = utils.validateStringInput(req.body.password);
    } catch {
        res.status(400).json({message: 'Invalid input'});
        return;
    }
    let password_hash = utils.hashPassword(password);
    let userExists;
    try {
        userExists = await database.userExists({username: username, password_hash: password_hash});
    } catch {
        console.log('USEREXISTS');
        res.status(500).json({message: 'Internal server error'});
        return;
    }
    if (!userExists) {
        res.status(401).json({message: 'Incorrect username or password'});
        return;
    }
    let user;
    try { 
        user = await database.getUser({username: username, password_hash: password_hash});
    } catch {
        console.log("GETUSER");
        res.status(500).json({message: 'Internal server error'});
        return;
    }
    let session_exists;
    try {
        session_exists = await database.sessionExists({user_id: user.id});
    } catch {
        console.log('sessionexists');
        res.status(500).json({message: 'Internal server error'});
        return;
    }
    if (session_exists) {
        try {
            await database.deleteSession({user_id: user.id});
        } catch {
            console.log('delete session');
            res.status(500).json({message: 'Internal server error'});
            return;
        }
    }
    const session_token = utils.generateAuthToken();
    try {
        await database.createSession({user_id: user.id, session_token: session_token});
        res.status(200).json({user_id: user.id, session_token: session_token})
    } catch {
        console.log('createsession');
        res.status(500).json({message: 'Internal server error'});
    }
}