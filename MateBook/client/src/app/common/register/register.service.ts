import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UrlConstant } from '../../constant/url.constant';

@Injectable()
export class RegisterService {

    constructor (private _router: Router, private urlConstant: UrlConstant, private apiService: ApiService) {} 

    async register(username: string, password: string, first_name: string, last_name: string) {
        let body = {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name
        }
        let response = await this.apiService.post(this.urlConstant.REGISTER_URL, body);
        if (response.status === 201) {
            this._router.navigateByUrl('/register/success');
            return null;
        } else {
            return response.data.message;
        }
    }
}