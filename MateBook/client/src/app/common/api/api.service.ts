import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    private async handleError(error: HttpErrorResponse){
        const data = await error.error.json();
        return {
            status: error.status,
            data: data
        }
    }

    post(url: string, body: any) {
        return this.httpClient.post(url, body, {observe: 'response'});
 
    
     /*   alert('api service start');
        alert(url);
        this.httpClient.post(url, body, {})
        try {
            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const status = response.status;
            const data = await response.json();
            return {status:status, data: data}
        } catch (err) {
            return { status: 404, data: { message: 'Connection error, please try again later'} }
        }*/
    }
}