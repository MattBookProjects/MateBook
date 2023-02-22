import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LogoutService } from 'src/app/common/logout/logout.service';
import { UserControlComponent } from './user-control.component';


@NgModule({
    declarations: [UserControlComponent],
    providers: [LogoutService],
    imports: [CommonModule],
    exports: [UserControlComponent]
})
export class UserControlModule { }