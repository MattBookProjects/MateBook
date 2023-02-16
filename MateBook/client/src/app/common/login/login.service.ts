import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstant } from 'src/app/constant/url.constant';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { ILoginResponse } from 'src/app/interface/ILoginResponse';
import { IErrorResponse } from 'src/app/interface/IErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private apiService: ApiService, private urlConstant: UrlConstant, private authenticationService: AuthenticationService, private router: Router) { }


    async login (username: string, password: string): Promise<string | null> {

      const onLoginSuccess = (user_id: number, session_token: string) => {
        this.authenticationService.logIn({user_id: user_id, session_token: session_token});
        this.router.navigateByUrl(''); 
      }

      return new Promise((resolve, reject) => {
        let body = {
          username: username,
          password: password
        }
        /*this.apiService.post(this.urlConstant.LOGIN_URL, body).subscribe(response => {
          if(response.status === 200){
            if(response.body){
              let castedBody = response.body as ILoginResponse
              this.authenticationService.logIn({user_id: castedBody.user_id, session_token: castedBody.session_token});
              this.router.navigateByUrl('');
              resolve(null);
            }
          } else {
            let castedBody = response.body as IErrorResponse;
            resolve(castedBody.message)
          }
        }) */

        this.apiService.post(this.urlConstant.LOGIN_URL, body).subscribe({
          next(response){
            if(response.status === 200){
              if(response.body){
                let castedBody = response.body as ILoginResponse
                onLoginSuccess(castedBody.user_id, castedBody.session_token)
                resolve(null);
              }
            } else {
              let castedBody = response.body as IErrorResponse;
              resolve(castedBody.message)
           }
          },
          error(error) {
            resolve(error.error.message)
          }
        })
      })
    }
 
}


