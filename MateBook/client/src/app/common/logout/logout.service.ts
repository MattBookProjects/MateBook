import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class LogoutService { 

    constructor(private httpClient: HttpClient, private apiService: ApiService) { }

    logOut(): void {
        this.apiService.delete()
    }
}