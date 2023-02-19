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
    }

    delete(url: string, body: any) {
        return this.httpClient.delete(url, {observe: 'response'});
    }
}