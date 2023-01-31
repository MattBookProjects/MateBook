import { Component } from '@angular/core';
import { RegisterService } from 'src/app/common/register/register.service';


@Component({
    selector: 'register-page',
    templateUrl: './register-page.component.html'
})
export class RegisterPageComponent { 
    username: string = '';
    password: string = '';
    repeat_password: string = '';
    first_name: string = '';
    last_name: string = '';

    constructor (private registerService: RegisterService) { }
}