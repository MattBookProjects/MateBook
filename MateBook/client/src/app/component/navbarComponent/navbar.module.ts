import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserControlModule } from "../userControl/user-control.module";
import { NavbarComponent } from "./navbar.component";

@NgModule({
    declarations: [NavbarComponent],
    imports: [CommonModule,UserControlModule],
    exports: [NavbarComponent]
})
export class NavbarModule { }