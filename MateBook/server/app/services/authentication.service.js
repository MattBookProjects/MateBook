import ResponseConst from "../constants/response.const.js";
import database from "../database/database.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

function AuthenticationService(){
    this.authenticate = async (token) => {
        return new Promise(async (res, rej) => {
            let decoded;
            try {
                const { sign, verify } = jwt; 
                decoded = verify(token, config.JWT_SECRET);
            } catch {
                rej(ResponseConst.RESPONSE_UNAUTHENTICATED);
            }
           // console.log("ID " + decoded.id + "\nUSERNAME: " + decoded.username + "\nFIRST NAME: " + decoded.first_name + "\nLAST NAME: " + decoded.last_name);
            let user_exists; 
            try{
                user_exists= await database.userExists({id: decoded.user_id, username: decoded.username, first_name: decoded.first_name, last_name: decoded.last_name});
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
            }
            if (user_exists){
                res(true);
            } else {
                rej(ResponseConst.RESPONSE_UNAUTHENTICATED);
            }
        });   
    }
}

const authenticationService = new AuthenticationService();

export default authenticationService;