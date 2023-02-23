import { NgModule } from "@angular/core";
import { ErrorComponent } from "./error/error.component";
import { ErrorModule } from "./error/error.module";
import { LoginPageComponent } from "./loginPage/login-page.component.";
import { LoginPageModule } from "./loginPage/login-page.module";
import { NavbarComponent } from "./navbarComponent/navbar.component";
import { NavbarModule } from "./navbarComponent/navbar.module";
import { PostsPageComponent } from "./postsPage/posts-page.component";
import { PostsPageModule } from "./postsPage/posts-page.module";
import { RegisterPageComponent } from "./registerPage/register-page.component";
import { RegisterPageModule } from "./registerPage/register-page.module";
import { RegisterSuccessComponent } from "./registerSuccess/register-success.component";
import { RegisterSuccessModule } from "./registerSuccess/registerSuccess.module";
import { UserControlModule } from "./userControl/user-control.module";


@NgModule({
    imports: [LoginPageModule, NavbarModule, RegisterPageModule, ErrorModule, RegisterSuccessModule, PostsPageModule, UserControlModule],
    exports: [LoginPageComponent, NavbarComponent, RegisterPageComponent, ErrorComponent, RegisterSuccessComponent, PostsPageComponent]
})
export class ComponentModule { }