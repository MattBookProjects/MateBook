import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}



    post(url: string, body: any) {
        return this.httpClient.post(url, body, {headers: { 'Authorization': `Bearer ${this.authenticationService.token}`, 'Content-Type': 'Application/json'}, observe: 'response'});
    }

    delete(url: string) {
        return this.httpClient.delete(url, { headers: { 'Authorization': `Bearer ${this.authenticationService.token}`}, observe: 'response'});
    }

    get(url: string) {
        return this.httpClient.get(url, {  headers: { 'Authorization': `Bearer ${this.authenticationService.token}`, 'Content-Type': 'application/json'}, observe: 'response'});
    }
}