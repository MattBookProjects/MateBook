import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/common/date/date.service';
import { PostService } from 'src/app/common/post/post.service';
import { Filter } from 'src/app/interface/Filter';
import { IPost } from 'src/app/interface/IPost';
import { SortedBy } from 'src/app/interface/SortedBy';
import { IFormattedPost } from 'src/app/interface/IFormattedPost';
@Component({
    selector: 'posts-page',
    templateUrl: './posts-page.component.html'
})
export class PostsPageComponent implements OnInit{ 
    posts: IFormattedPost[] = [];
    filter: Filter = 'followed';
    sortedBy: SortedBy = 'recent'
    perPage: number = 20;
    pageIndex: number = 0;
    error: boolean = false;
    loading: boolean = true;

    constructor(private dateService: DateService, private postService: PostService){}

    async ngOnInit(){
       this.loadPosts();
    }

    async loadPosts(){
        try {
            this.posts = await this.postService.getPosts(this.filter, this.sortedBy, this.perPage, this.pageIndex);
        } catch {
            this.error = true;
        }
    }

}