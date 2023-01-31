import ResponseConst from "../constants/response.const";
import database from "../../database";

function AuthenticationService(){
    this.authenticate = async (user_id, session_token) => {
        return new Promise(async (res, rej) => {
            let session_exists;
            try {
                session_exists = await database.sessionExists({user_id: user_id, session_token: session_token});
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            if (session_exists){
                res(true);
            } else {
                rej(ResponseConst.RESPONSE_UNAUTHENTICATED);
            }
        });   
    }
}

const authenticationService = new AuthenticationService();

export default authenticationService;