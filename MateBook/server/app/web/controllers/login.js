import validators from '../../utils/validators.js';
import ResponseConst from '../../constants/response.const.js';
import loginService from '../../services/login.service.js';
import * as jwt from 'jsonwebtoken';

export default async function login (req, res) {
    let username, password;
    try {
        username = validators.validateStringInput(req.body.username);
        password = validators.validateStringInput(req.body.password);
    } catch {
        res.status(ResponseConst.RESPONSE_INVALID_INPUT.status).json({message: ResponseConst.RESPONSE_INVALID_INPUT.message});
        return;
    }
    try {
        let token = await loginService.login(username, password);
        res.status(200).json({token: token});
    } catch (err) {
        res.status(err.status).json({message: err.message })
    }
}