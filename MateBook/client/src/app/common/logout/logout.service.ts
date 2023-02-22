import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from 'src/app/constant/url.constant';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class LogoutService { 

    constructor(private httpClient: HttpClient, private router: Router, private urlConstant: UrlConstant, private apiService: ApiService, private authenticationService: AuthenticationService) { }

    logOut(): void {
        alert('logout');
        const onLogout = () => {
            this.authenticationService.logOut();
            alert('on logout')
            this.router.navigateByUrl('/login')
        }
        this.apiService.delete(this.urlConstant.LOGOUT_URL, { auth: this.authenticationService.auth}).subscribe({
            next(response){
                alert(response.status);
                console.log(response);
                if (response.status === 200) {
                    alert('status200');
                    onLogout();
                }
            },
            error(error){
                alert('error');
            }
       })
    }
}