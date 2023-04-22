import { NgModule } from "@angular/core";
import { PostComponent } from "./post.component";


@NgModule({
    declarations: [PostComponent],
    exports: [PostComponent]
})
export class PostModule {}