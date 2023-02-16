import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RegisterService } from '../common/register/register.service';

@Injectable()
export class RegisterSuccessGuard implements CanActivate {
    constructor(private registerService: RegisterService, private router: Router){}

    canActivate(){
        let ret = this.registerService.getRegisterSuccess();
        if (!ret){
            this.router.navigateByUrl('/register');
        }
        return ret;
    }
}