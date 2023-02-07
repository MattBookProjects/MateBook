import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    async post(url: string, body: any): Promise<{ status: number, data?: any }> {
        alert('api service start');
        alert(url);
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
        }
    }
}