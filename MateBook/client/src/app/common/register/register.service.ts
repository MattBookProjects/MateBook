import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UrlConstant } from '../../constant/url.constant';

@Injectable()
export class RegisterService {

    constructor (private urlConstant: UrlConstant, private apiService: ApiService) {} 

    async register(username: string, password: string, first_name: string, last_name: string): Promise<string | null> {
        alert('register service start');
        let body = {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name
        }
        let response;
        try{
            alert('before api service')
            response = await this.apiService.post(this.urlConstant.REGISTER_URL, body);
            alert('after api service')
        } catch (err){
            return err as string;
        }
        if (response.status === 201) {
          //  this._router.navigateByUrl('/register/success');
            alert('201');
            return null;
        } else {
            return response.data!.message;
        }
    }
}