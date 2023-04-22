import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    token: string | null = null;


    isLoggedIn(): boolean {
        if (this.token) {
            return true;
        }
        return false;
    }

    logIn(token: string){
        this.token = token;
        
    }

    logOut(){
        this.token = null;
    }
   
}