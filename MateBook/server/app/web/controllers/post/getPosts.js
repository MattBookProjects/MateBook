import postService from "../../../services/post.service.js";
import config from "../../../../config.js";
import jwt from "jsonwebtoken";

export async function getPosts(req, res){
    let filter = req.query.filter;
    let sortedBy = req.query.sortedBy;
    let perPage = req.query.perPage;
    let pageIndex = req.query.pageIndex;
    const token = req.headers['authorization'].split(' ')[1];
    const {sign, verify} = jwt;
    const decoded = verify(token, config.JWT_SECRET);
    const user_id = decoded.user_id;

    console.log(`filter: ${filter}`);

    if(!filter || filter !== 'followed' && filter !== 'friends' && filter !== 'all'){
        filter ='followed';
    }

    if(!sortedBy || sortedBy !== 'recent' && sortedBy !== 'likes'){
        sortedBy = 'likes';
    }
    if(!perPage || typeof perPage !== 'number'){
        perPage = 20;
    }

    if(!pageIndex || typeof pageIndex !== 'number'){
        pageIndex = 0;
    }
    let ret;
    console.log(`filter: ${filter}`);
    try{
        ret = await postService.getAll(filter, sortedBy, perPage, pageIndex, user_id);
        res.status(200).json({posts: ret})
    }
    catch (err) {
        res.status(err.status).json({message: err.message});
    }

}