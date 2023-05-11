import validators from "../../../utils/validators.js"
import ResponseConst from "../../../constants/response.const.js";
import postService from "../../../services/post.service.js";
import jwt from "jsonwebtoken";
import config from "../../../../config.js";

export async function createPost (req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const {sign, verify} = jwt;
    const user = verify(token, config.JWT_SECRET)
    const user_id = user.user_id;
    let content
    try {
        //author_id = validators.validateNumberInput(req.body.author_id);
        content = validators.validateStringInput(req.body.content);    
    }
    catch {
        res.status(ResponseConst.RESPONSE_INVALID_INPUT.status).json({message: ResponseConst.RESPONSE_INVALID_INPUT.message});
        return;
    }
    try {
        let ret = await postService.create(user_id, content);
        res.status(ret.status).json({message: ret.message});
    }
    catch (err) {
        res.status(err.status).json({message: err.message})
    }
    
}