import { NgModule } from "@angular/core";
import { LoginPageComponent } from "./loginPage/login-page.component.";
import { LoginPageModule } from "./loginPage/login-page.module";
import { NavbarComponent } from "./navbarComponent/navbar.component";
import { NavbarModule } from "./navbarComponent/navbar.module";
import { RegisterPageComponent } from "./registerPage/register-page.component";
import { RegisterPageModule } from "./registerPage/register-page.module";


@NgModule({
    imports: [LoginPageModule, NavbarModule, RegisterPageModule],
    exports: [LoginPageComponent, NavbarComponent, RegisterPageComponent]
})
export class ComponentModule { }