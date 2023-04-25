import { NgModule } from "@angular/core";
import { PostFormCompnent } from "./post-form.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [PostFormCompnent],
    exports: [PostFormCompnent],
    imports: [FormsModule]
})
export class PostFormModule { }