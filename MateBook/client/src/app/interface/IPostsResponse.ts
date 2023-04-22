import { IPost } from "./IPost"

export interface IPostsResponse {
    posts: {
        id: number;
        content: string;
        time: string;
        author: {
            id: number,
            name: string
        };
        likes: number;
        is_edited: boolean
    } [];
}