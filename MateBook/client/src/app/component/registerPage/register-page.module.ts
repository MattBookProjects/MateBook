import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"
import { RegisterService } from "src/app/common/register/register.service";
import { RegisterPageComponent } from "./register-page.component";

@NgModule({
    declarations: [RegisterPageComponent],
    imports: [FormsModule],
    providers: [RegisterService],
    exports: [RegisterPageComponent]
})
export class RegisterPageModule { }