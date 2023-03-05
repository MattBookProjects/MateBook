import ResponsesConst from "../constants/response.const.js";
import database from '../database/database.js';

function LogoutService(){
    this.logout = async (user_id, session_token) => {
        return new Promise(async (res, rej) => {
            try {
                await database.deleteSession({user_id: user_id, session_token: session_token});
                res(ResponsesConst.RESPONSE_OK);
            } catch {
                rej(ResponsesConst.RESPONSE_INTERNAL_ERROR);
            }
        })
    }
}

const logoutService = new LogoutService();

export default logoutService