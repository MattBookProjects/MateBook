import express from 'express';
import { createPost } from '../controllers/post/createPost.js';
import { getPosts } from '../controllers/post/getPosts.js';
import authenticationMiddleware from '../middleware/authentication.middleware.js';


function PostRouter() {
    const router = express.Router();

    router.post('/', authenticationMiddleware, createPost);

    router.get('/', authenticationMiddleware, getPosts);

    return router;
}

export const postRouter = PostRouter();