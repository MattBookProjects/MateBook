import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from 'src/app/constant/url.constant';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService, private urlConstant: UrlConstant, private authenticationService: AuthenticationService, private router: Router) { }

    async login (username: string, password: string): Promise<string | null> {
        let body = {
          username: username,
          password: password
        }
        let response;
        try {
          response = await this.apiService.post(this.urlConstant.LOGIN_URL, body);
        } catch (err) {
          return err as string;
        }
        if (response.status === 200){
          this.authenticationService.logIn(response.data);
          this.router.navigateByUrl('');
          return null;
        } else {
          return response.data.message;
        }
    }
}
