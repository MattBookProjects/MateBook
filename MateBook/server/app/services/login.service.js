import ResponseConst from "../constants/response.const.js";
import encryption from "../utils/encryption.js"; 
import database from "../database/database.js";
import jwt from 'jsonwebtoken';
import config from '../../config.js';

function LoginService() {
    this.login = async (username, password) => {
        return new Promise(async (res, rej) => {
            let password_hash = encryption.hashPassword(password);
            let userExists;
            try {
                userExists = await database.userExists({ username: username, password_hash: password_hash });
            } catch {
                console.log('user exists error login service')
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            if (!userExists) {
                rej(ResponseConst.RESPONSE_INCORRECT_USERNAME_OR_PASSWORD);
            }
            let user;
            try {
                user = await database.getUser({ username: username, password_hash: password_hash });
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            const { sign, verify } = jwt;
            const token = sign({
                user_id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            }, config.JWT_SECRET);
            res(token);
        });
    }
}

const loginService = new LoginService();

export default loginService;