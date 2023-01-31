import ResponseConst from "../constants/response.const";
import encryption from "../../utils/encryption"; 
import database from "../../database";

function LoginService() {
    this.login = async (username, password) => {
        return new Promise(async (res, rej) => {
            let password_hash = encryption.hashPassword(password);
            let userExists;
            try {
                userExists = await database.userExists({ username: username, password_hash: password_hash });
            } catch {
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
            let session_exists;
            try {
                session_exists = await database.sessionExists({ user_id: user.id });
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            if (session_exists) {
                try {
                    await database.deleteSession({ user_id: user.id });
                } catch {
                    rej(ResponseConst.RESPONSE_INTERNAL_ERROR)
                }
            }
            const session_token = encryption.generateAuthToken();
            try {
                await database.createSession({ user_id: user.id, session_token: session_token });
                res({ user_id: user.id, session_token: session_token });
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }

        });
    }
}

const loginService = new LoginService();

export default loginService;