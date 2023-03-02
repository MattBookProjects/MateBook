import { HttpClient } from "@angular/common/http";
import { Route, Router } from "@angular/router";
import { UrlConstant } from "src/app/constant/url.constant";
import { ApiService } from "../api/api.service";
import { AuthenticationService } from "../authentication/authentication.service";
import { LogoutService } from "./logout.service";


describe('Tests for logout service', () => {
    describe('Tests for logout function', () => {

        let mockHttpClient: HttpClient,
        mockRouter: Router,
        mockUrlConstant: UrlConstant,
        mockApiService: ApiService,
        mockAuthenticationService: AuthenticationService;
        beforeEach(() => {
            mockHttpClient = {} as HttpClient;
            mockRouter = {
                navigateByUrl: (url: string) => {}
            } as unknown as Router;
            mockUrlConstant = {} as UrlConstant;
            mockApiService = {
                delete: (url: string, body: any) => ({
                    subscribe: (callbacks: {next: (response: any) => void, error: (response: any) => void}) => callbacks.next({status: 200})
                })
            } as unknown as ApiService;
            mockAuthenticationService = {
                logOut: () => {}
            } as unknown as AuthenticationService;
        })

        it('On correct logout call authentication service logout and router navigateByUrl', async () => {
             spyOn(mockAuthenticationService, 'logOut');
             spyOn(mockRouter, 'navigateByUrl');
             const logoutService = new LogoutService(mockHttpClient, mockRouter, mockUrlConstant, mockApiService, mockAuthenticationService);
             logoutService.logOut();
             expect(mockAuthenticationService.logOut).toHaveBeenCalled();
             expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
        });

        it('On internal server error do not call authentication service logout and router navigateByUrl', async () => {
            mockApiService = {
                delete: (url: string, body: any) => ({
                    subscribe: (callbacks: {next: (response: any) => void, error: (response: any) => void}) => callbacks.error({status: 500, error: {message: 'Internal server error'}})
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logOut');
            spyOn(mockRouter, 'navigateByUrl');
            const logoutService = new LogoutService(mockHttpClient, mockRouter, mockUrlConstant, mockApiService, mockAuthenticationService);
            logoutService.logOut();
            expect(mockAuthenticationService.logOut).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
       });

       it('On unauthorized response do not call authentication service logout and router navigateByUrl', async () => {
            mockApiService = {
                delete: (url: string, body: any) => ({
                    subscribe: (callbacks: {next: (response: any) => void, error: (response: any) => void}) => callbacks.error({status: 401, error: {message: 'User not authenticated'}})
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logOut');
            spyOn(mockRouter, 'navigateByUrl');
            const logoutService = new LogoutService(mockHttpClient, mockRouter, mockUrlConstant, mockApiService, mockAuthenticationService);
            logoutService.logOut();
            expect(mockAuthenticationService.logOut).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        });

        it('On connection error do not call authentication service logout and router navigateByUrl', async () => {
            mockApiService = {
                delete: (url: string, body: any) => ({
                    subscribe: (callbacks: {next: (response: any) => void, error: (response: any) => void}) => callbacks.error({status: 0})
                })
            } as unknown as ApiService;
            spyOn(mockAuthenticationService, 'logOut');
            spyOn(mockRouter, 'navigateByUrl');
            const logoutService = new LogoutService(mockHttpClient, mockRouter, mockUrlConstant, mockApiService, mockAuthenticationService);
            logoutService.logOut();
            expect(mockAuthenticationService.logOut).not.toHaveBeenCalled();
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        });
    })
})