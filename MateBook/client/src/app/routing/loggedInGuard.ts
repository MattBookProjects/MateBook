import { CanActivate } from "@angular/router";
import { AuthenticationService } from "../common/authentication/authentication.service";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate():boolean{
        if (this.authenticationService.isLoggedIn()){
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}