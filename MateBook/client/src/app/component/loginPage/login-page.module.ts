import { NgModule } from "@angular/core";
import { LoginService } from "src/app/common/login/login.service";
import { LoginPageComponent } from "./login-page.component.";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [LoginPageComponent],
    providers: [LoginService],
    imports: [FormsModule],
    exports: [LoginPageComponent]
})
export class LoginPageModule { }