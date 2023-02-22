import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
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
    }

    delete(url: string, body: any) {
        alert('api service delete');
        return this.httpClient.request('DELETE', url, { body: body, headers:{ 'Content-Type': 'application/json'},observe: 'response'});
    }
}