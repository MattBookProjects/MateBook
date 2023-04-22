import { Injectable } from '@angular/core';


@Injectable()
export class UrlConstant {
    BASE_URL: string = 'http://localhost:3000/api';
    
    get LOGIN_URL(): string {
        return this.BASE_URL + '/login'
    }

    get REGISTER_URL(): string {
        return this.BASE_URL + '/register';
    }

    get LOGOUT_URL(): string {
        return this.BASE_URL + '/logout'
    }

    get POSTS_URL(): string {
        return this.BASE_URL + '/posts'
    }
}