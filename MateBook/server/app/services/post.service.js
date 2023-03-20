import database from "../database/database.js"
import ResponseConst from "../constants/response.const.js"
import sqlHelpers from "../database/sqlHelpers.js"

function PostService(){

    this.create = async (author_id, content) => {
        return new Promise(async (res, rej) => {
            let postObject = {
                author_id: author_id,
                content: content,
                time: sqlHelpers.convertToSqlDatetime(new Date())
            }
            try {
                await database.createPost(postObject);
                res(ResponseConst.RESPONSE_CREATED);
             
            }
            catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR);
                
            }

        })
       
    }

    this.getAll = async (filter, sortedBy, perPage, pageIndex, user_id) => {
        return new Promise(async (res, rej) => {
            let offset = perPage  * pageIndex;
            let count = perPage;
            let posts;
            try {
                posts = await database.getPosts(filter, sortedBy, offset, count, user_id);
                res(posts.map(post => ({
                    id: post.id,
                    content: post.content,
                    time: post.time,
                    likes: post.likes,
                    is_edited: post.is_edited,
                    author: {
                        id: post.author_id,
                        name: post.author_first_name + ' ' + post.author_last_name
                    }
                })));
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR)
            }
        });
    }

    this.edit = async ( conditions, updated) => {
        return new Promise(async (res, rej) => {
            const time = sqlHelpers.convertToSqlDatetime(new Date());
            updated.time = time;
            updated.edited = true;

            try {
                await database.editPost(conditions, updated)
            } catch {
                rej(ResponseConst.RESPONSE_INTERNAL_ERROR)
            }
        })
    }
}

const postService = new PostService();

export default postService;

