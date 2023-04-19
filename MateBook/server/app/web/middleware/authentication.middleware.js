import validators from "../../utils/validators.js";
import authenticationService from "../../services/authentication.service.js";

export default async function authenticationMiddleware(req, res, next){
    console.log(req.body)
    const auth = req.body.auth;
    if(!auth){
        console.log("missing auth")
        res.status(401).json({message: 'User not authenticated'})
        return
    }
    let user_id, session_token;
    try {
        user_id = validators.validateNumberInput(auth.user_id);
        session_token = validators.validateStringInput(auth.session_token);
    } catch {
        res.status(401).json({message: 'User not authenticated'});
        console.log("invalid")
        return;
    }
    try{
        await authenticationService.authenticate(user_id, session_token);
        next();
    } catch (err){
        res.status(err.status).json({message: err.message})
    }
}