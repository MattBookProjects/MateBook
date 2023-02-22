import { Component, EventEmitter, Output } from '@angular/core';
import { LogoutService } from 'src/app/common/logout/logout.service';

@Component({
    selector: 'user-control',
    templateUrl: './user-control.component.html'
})
export class UserControlComponent { 

    dropdown: boolean = false;
    @Output() onLogout = new EventEmitter();

    constructor(private logoutService: LogoutService) {}

    toggleDropdown() {
        this.dropdown = !this.dropdown;
    }

    logOut() {
        this.logoutService.logOut();
        this.onLogout.emit();
    }
}