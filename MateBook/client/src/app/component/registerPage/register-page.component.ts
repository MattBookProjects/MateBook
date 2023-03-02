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
    error: string | null = null;

    constructor (private registerService: RegisterService) { }

    async register(){
        if (this.username === ''){
            this.error = 'Username is required'; 
        } else if (this.password === ''){
            this.error = 'Password is required';
        } else if (this.repeat_password === ''){
            this.error = 'Repeat password is required';
        } else if (this.first_name === ''){
            this.error = 'First name is required';
        } else if (this.last_name === ''){
            this.error = 'Last name is required';
        } else if (this.password !== this.repeat_password){
            this.error = 'Passwords dont match'
        } else {
            this.error = null;
            let err;
            try{
                err = await this.registerService.register(this.username, this.password, this.first_name, this.last_name); 
                //alert('REGISTER COMPONENT ERROR: ' + err);
                if (err){
                    this.error = err;
                }       
            } catch {
                return;
            }
        }
    }
}