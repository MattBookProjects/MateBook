import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"
import { RegisterService } from "src/app/common/register/register.service";
import { RegisterPageComponent } from "./register-page.component";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "../loginPage/login-page.component.";
import { ErrorModule } from "../error/error.module";
import { BrowserModule } from "@angular/platform-browser";
import { ApiService } from "src/app/common/api/api.service";
import { UrlConstant } from "src/app/constant/url.constant";
import { RegisterSuccessComponent } from "../registerSuccess/register-success.component";

@NgModule({
    declarations: [RegisterPageComponent],
    imports: [
        FormsModule,
        RouterModule.forRoot([
            {path: '', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent},
            {path: 'register/success', component: RegisterSuccessComponent},
            {path: 'login', component: LoginPageComponent}
          ]),
        ErrorModule,
        BrowserModule
        ],
    providers: [UrlConstant, ApiService, RegisterService],
    exports: [RegisterPageComponent]
})
export class RegisterPageModule { }