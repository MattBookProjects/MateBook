import { NgModule } from '@angular/core';
import { PostsPageComponent } from './posts-page.component';
import { PostModule } from '../post/post.module';
import { PostService } from 'src/app/common/post/post.service';
import { DateService } from 'src/app/common/date/date.service';
import { CommonModule } from '@angular/common';
import { PostFormModule } from '../postForm/post-form.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PostsPageComponent],
    exports: [PostsPageComponent],
    imports: [PostModule, PostFormModule, CommonModule, FormsModule],
    providers: [DateService, PostService]
})
export class PostsPageModule {}