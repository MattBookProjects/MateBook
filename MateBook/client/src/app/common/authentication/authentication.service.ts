import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    auth: { user_id: number, session_token: string} | null = null;


    isLoggedIn(): boolean {
        if (this.auth) {
            return true;
        }
        return false;
    }

    logIn(auth: {user_id: number, session_token: string}){
        this.auth = auth;
    }

    logOut(){
        this.auth = null;
    }
   
}