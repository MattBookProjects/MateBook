import { NgModule } from "@angular/core";
import { ErrorComponent } from "./error/error.component";
import { ErrorModule } from "./error/error.module";
import { LoginPageComponent } from "./loginPage/login-page.component.";
import { LoginPageModule } from "./loginPage/login-page.module";
import { NavbarComponent } from "./navbarComponent/navbar.component";
import { NavbarModule } from "./navbarComponent/navbar.module";
import { RegisterPageComponent } from "./registerPage/register-page.component";
import { RegisterPageModule } from "./registerPage/register-page.module";


@NgModule({
    imports: [LoginPageModule, NavbarModule, RegisterPageModule, ErrorModule],
    exports: [LoginPageComponent, NavbarComponent, RegisterPageComponent, ErrorComponent]
})
export class ComponentModule { }