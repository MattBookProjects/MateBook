import validators from "../../../utils/validators";
import authenticationService from "../../services/authentication.service";

export default async function authenticationMiddleware(req, res, next){
    const auth = req.body.auth;
    if(!auth){
        res.status(401).json({message: 'User not authenticated'})
        return
    }
    let user_id, session_token;
    try {
        user_id = validators.validateNumberInput(auth.user_id);
        session_token = validators.validateStringInput(auth.session_token);
    } catch {
        res.status(401).json({message: 'User not authenticated'});
        return;
    }
    try{
        await authenticationService.authenticate(user_id, session_token);
        next();
    } catch (err){
        res.status(err.status).json({message: err.message})
    }
}