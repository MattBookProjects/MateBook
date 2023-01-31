import encryption from "../../utils/encryption"
import database from "../../database"
import ResponseConst from "../constants/response.const";

function RegsiterService(){
    this.register = async (username, password, first_name, last_name) => {
        return new Promise( async (res, rej) => {
            let password_hash = encryption.hashPassword(password);
            let userExists;
            try {
                userExists = await database.userExists({username: username});
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            if (userExists) {
                rej(ResponseConst.RESPONSE_USERNAME_ALREADY_TAKEN);
            }
            try {
                await database.createUser({username: username, password_hash: password_hash, first_name: first_name, last_name: last_name});
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            res(ResponseConst.RESPONSE_CREATED);
        })

    }
}

const registerService = new RegsiterService();

export default registerService;