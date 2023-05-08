import { Component } from "@angular/core";
import { PostService } from "src/app/common/post/post.service";


@Component({
    templateUrl: "./post-form.component.html",
    selector: "post-form"
})
export class PostFormCompnent {

    content: string = "";
    error: string | null = null;

    constructor(private postService: PostService){}

    submitPost(): void {
        try{
            this.postService.createPost(this.content);
        } catch (error){
            this.error = error.message;
        }
    }
}