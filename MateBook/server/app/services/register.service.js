import encryption from "../utils/encryption.js"
import database from "../../database.js"
import ResponseConst from "../constants/response.const.js";

function RegsiterService(){
    this.register = async (username, password, first_name, last_name) => {
        return new Promise( async (res, rej) => {
            let password_hash = encryption.hashPassword(password);
            let userExists;
            try {
                userExists = await database.userExists({username: username});
            } catch {
                console.log('user exists');
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
                return;
            }
            console.log(userExists);
            if (userExists) {
                rej(ResponseConst.RESPONSE_USERNAME_ALREADY_TAKEN);
                return;
            }
            try {
                console.log('Still executing');
                await database.createUser({username: username, password_hash: password_hash, first_name: first_name, last_name: last_name});
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
                return;
            }
            res(ResponseConst.RESPONSE_CREATED);
        })

    }
}

const registerService = new RegsiterService();

export default registerService;