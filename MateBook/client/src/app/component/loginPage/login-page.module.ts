import { NgModule } from "@angular/core";
import { LoginService } from "src/app/common/login/login.service";
import { LoginPageComponent } from "./login-page.component.";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegisterPageComponent } from "../registerPage/register-page.component";
import { ErrorModule } from "../error/error.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [LoginPageComponent],
    providers: [LoginService],
    imports: [
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent},
            {path: 'login', component: LoginPageComponent}
          ]),
        ErrorModule,
        BrowserModule
    ],
    exports: [LoginPageComponent]
})
export class LoginPageModule { }