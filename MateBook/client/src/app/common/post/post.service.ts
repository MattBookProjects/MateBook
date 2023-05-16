import { Injectable } from "@angular/core";
import { UrlConstant } from "src/app/constant/url.constant";
import { Filter } from "src/app/interface/Filter";
import { SortedBy } from "src/app/interface/SortedBy";
import { ApiService } from "../api/api.service";
import { AuthenticationService } from "../authentication/authentication.service"
import { IPost } from "src/app/interface/IPost";
import { IPostsResponse } from "src/app/interface/IPostsResponse";
import { DateService } from "../date/date.service";
import { IFormattedPost } from "../../interface/IFormattedPost";

@Injectable()
export class PostService {

    constructor(private apiService: ApiService, private urlConstant: UrlConstant, private authenticationService: AuthenticationService, private dateService: DateService) {}

    getPosts(filter: Filter, sortedBy: SortedBy, perPage: number, pageIndex: number): Promise<IFormattedPost[]> {

        const getDateService = () => this.dateService;

        let url = this.urlConstant.POSTS_URL + "?filter=" + filter + "&sortedBy=" + sortedBy + "&perPage=" + perPage + "&pageIndex=" + pageIndex;  


        return new Promise((res, rej) => {
            this.apiService.get(url).subscribe({
                next(response){
                    if(response.status === 200){
                        if(response.body){
                            let castedBody = response.body as IPostsResponse; 
                            console.log(castedBody.posts);
                            res(castedBody.posts.map(post => ({
                                id: post.id,
                                author: post.author,
                                content: post.content,
                                likes: post.likes,
                                is_edited: post.is_edited,
                                time: getDateService().dateToString(getDateService().formatDate(post.time))
                            })))
                        }
                    }
                }
            })
        })
    }

    createPost(content: string): Promise<void> {
        return new Promise((res, rej) => {
            this.apiService.post(this.urlConstant.POSTS_URL, { content: content }).subscribe({
                next(response){
                    if(response.status === 201){
                        res()
                    }
                },
                error(error){
                    if(error.status === 0){
                        rej({message: "Connection error, please try again later"});
                    } else if(error.status === 500){
                        rej({message: "Internal server error, please try again later"})
                    }
                }
            })

        })
      
    }
}