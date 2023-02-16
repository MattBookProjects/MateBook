import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ApiService } from "src/app/common/api/api.service"
import { AuthenticationService } from "src/app/common/authentication/authentication.service";
import { LoginService } from "src/app/common/login/login.service";
import { UrlConstant } from "src/app/constant/url.constant";

describe('Tests for login service', () => {
    describe('Tests for login function', () => {
        let mockHttpClient: HttpClient;
        let mockApiService: ApiService;
        let mockAuthenticationService: AuthenticationService
        let mockUrlConstant: UrlConstant;
        let mockRouter: Router;
        beforeEach(() => {
            mockHttpClient = {
                post: (url: string, body: any, options?: any) => {}
            } as unknown as HttpClient;
            mockApiService = {
                post: (url: string, body: any) => ({ 
                    subscribe: ( callback: (response: any) => void ) => { callback({status: 200, body: { user_id: 1, session_token: 'token'}}) }
                })
            } as unknown as ApiService;
            mockAuthenticationService = {
                logIn: (auth: {user_id: number, session_token: string}) => {}
            } as unknown as AuthenticationService;
            mockUrlConstant = { } as unknown as UrlConstant;
            mockRouter = { 
                navigateByUrl:  (url: string) => {}
            } as unknown as Router;
        })
        it('Should return null, navigate to main page, and call authentication service on correct login', async () => {
            spyOn(mockAuthenticationService, 'logIn');
            spyOn(mockRouter, 'navigateByUrl');
            const loginService = new LoginService(mockHttpClient, mockApiService, mockUrlConstant, mockAuthenticationService, mockRouter);
            let ret = loginService.login('username', 'password');
            await expectAsync(ret).toBeResolvedTo(null);
            expect(mockAuthenticationService.logIn).toHaveBeenCalledOnceWith({user_id: 1, session_token: 'token'});
            expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
        });
        it('Return message on connection error', async () => {
            mockApiService = {
                post: (url: string, body: any) => ({ 
                    subscribe: ( callback: (response: any) => void ) => { callback({status: 404, body: { message: 'Connection error, please try again later'}}) }
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logIn');
            spyOn(mockRouter, 'navigateByUrl');
            const loginService = new LoginService(mockHttpClient, mockApiService, mockUrlConstant, mockAuthenticationService, mockRouter);
            let ret = loginService.login('username', 'password');
            await expectAsync(ret).toBeResolvedTo('Connection error, please try again later');
            expect(mockAuthenticationService.logIn).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        });
        it('Return message on incorrect login', async () => {
            mockApiService = {
                post: (url: string, body: any) => ({ 
                    subscribe: ( callback: (response: any) => void ) => { callback({status: 401, body: { message: 'Incorrect username or password'}}) }
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logIn');
            spyOn(mockRouter, 'navigateByUrl');
            const loginService = new LoginService(mockHttpClient, mockApiService, mockUrlConstant, mockAuthenticationService, mockRouter);
            let ret = loginService.login('username', 'password');
            await expectAsync(ret).toBeResolvedTo('Incorrect username or password');
            expect(mockAuthenticationService.logIn).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        });
        it('Return message on internal server error', async () => {
            mockApiService = {
                post: (url: string, body: any) => ({ 
                    subscribe: ( callback: (response: any) => void ) => { callback({status: 500, body: { message: 'Internal server error'}}) }
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logIn');
            spyOn(mockRouter, 'navigateByUrl');
            const loginService = new LoginService(mockHttpClient, mockApiService, mockUrlConstant, mockAuthenticationService, mockRouter);
            let ret = loginService.login('username', 'password');
            await expectAsync(ret).toBeResolvedTo('Internal server error');
            expect(mockAuthenticationService.logIn).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        });
    })
})