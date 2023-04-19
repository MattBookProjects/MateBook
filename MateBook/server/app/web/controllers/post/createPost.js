import validators from "../../../utils/validators.js"
import ResponseConst from "../../../constants/response.const.js";
import postService from "../../../services/post.service.js";

export async function createPost (req, res) {
    const author_id = req.body.auth.user_id;
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
        let ret = await postService.create(author_id, content);
        res.status(ret.status).json({message: ret.message});
    }
    catch (err) {
        res.status(err.status).json({message: err.message})
    }
    
}