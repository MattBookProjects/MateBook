import { Component, EventEmitter, Output } from "@angular/core";
import { PostService } from "src/app/common/post/post.service";


@Component({
    templateUrl: "./post-form.component.html",
    selector: "post-form"
})
export class PostFormCompnent {

    content: string = "";
    error: string | null = null;
    @Output() onPost = new EventEmitter();

    constructor(private postService: PostService){}

    submitPost(): void {
        try{
            this.postService.createPost(this.content);
            this.onPost.emit();
        } catch (error){
            this.error = (error as {message: string}).message;
        }
    }
}