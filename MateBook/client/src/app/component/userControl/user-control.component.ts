import { Component } from '@angular/core';

@Component({
    selector: 'user-control',
    templateUrl: './user-control.component.html'
})
export class UserControlComponent { 

    dropdown: boolean = false;

    constructor() {}

    toggleDropdown() {
        this.dropdown = !this.dropdown;
    }

    logOut() {

    }
}