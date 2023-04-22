import validators from "../../utils/validators.js";
import authenticationService from "../../services/authentication.service.js";

export default async function authenticationMiddleware(req, res, next){
    const auth_header = req.headers['authorization'];
    console.log(req.headers);
    if(!auth_header){
        res.status(401).json({message: 'User not authenticated'})
        return;
    }
    const token = auth_header.split(' ')[1];
    if(!token){
        res.status(401).json({message: 'User not authenticated'})
        return;
    }
    try{
        await authenticationService.authenticate(token);
        next();
    } catch (err){
        res.status(err.status).json({message: err.message})
    }
}