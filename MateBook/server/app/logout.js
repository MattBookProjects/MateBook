import database from '../database.js';
import validators from '../utils/validators.js';

export default async function logout(req, res){
    let user_id, session_token;
    try {
        user_id = validators.validateNumberInput(req.body.auth.user_id);
        session_token = validators.validateStringInput(req.body.auth.session_token)
    } catch {
        res.status(400).json({message: 'Invalid input'});
        return;
    }
    let session_exists; 
    try {
        session_exists = await database.sessionExists({user_id: user_id, session_token: session_token});
    } catch {
        res.status(500).json({message: 'Internal server error'});
        return;
    }
    if (session_exists){
        try {
            await database.deleteSession({user_id: user_id, session_exists: session_exists});
            res.status(200);
        } catch {
            res.status(500).json({message: 'Internal server error'});
        }
    } else {
        res.status(400).json({message: 'User not logged in'});
    }
}