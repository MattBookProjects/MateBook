import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UrlConstant } from '../../constant/url.constant';
import { HttpClient } from '@angular/common/http';
import { IErrorResponse } from 'src/app/interface/IErrorResponse';

@Injectable()
export class RegisterService {

    registerSuccess: boolean = false;

    constructor (private httpClient: HttpClient, private urlConstant: UrlConstant, private apiService: ApiService, private router: Router) {} 

    register(username: string, password: string, first_name: string, last_name: string): Promise<string | null | undefined> {
        return new Promise((resolve, reject) => {
            let body = {
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name
            }
            
            this.apiService.post(this.urlConstant.REGISTER_URL, body).subscribe(response => {
                if(response.status == 201){
                    alert('response status 201');
                    this.registerSuccess = true
                    this.router.navigateByUrl('/registersuccess');
                } else {
                    resolve((response.body as IErrorResponse).message);
                }
                resolve(null);
            })
        })
    }

    getRegisterSuccess(): boolean {
        let ret = this.registerSuccess;
        this.registerSuccess = false;
        return ret;
    }
}