import { IDate } from "./IDate";

export interface IPost {
    id: number;
    content: string;
    time: IDate;
    author: {
        id: number,
        name: string
    };
    likes: number;
    is_edited: boolean
}