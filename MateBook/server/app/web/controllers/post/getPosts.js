import postService from "../../../services/post.service";


export async function getPosts(req, res){
    let filter = req.query('filter');
    let sortedBy = req.query('sortedBy');
    let perPage = req.query('perPage');
    let pageIndex = req.query('pageIndex');
    let user_id = req.body.auth.user_id;

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
    try{
        ret = await postService.getPosts(filter, sortedBy, perPage, pageIndex, user_id);
        res.status(200).json(ret)
    }
    catch (err) {
        res.status(err.status).json({message: err.message});
    }

}