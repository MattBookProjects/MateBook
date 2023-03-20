import express from 'express';
import { createPost } from '../controllers/post/createPost';
import { getPosts } from '../controllers/post/getPosts';
import authenticationMiddleware from '../middleware/authentication.middleware';


function PostRouter() {
    const router = express.Router();

    router.post('/', authenticationMiddleware, createPost);

    router.get('/', authenticationMiddleware, getPosts)

    return router;
}

export const postRouter = PostRouter();