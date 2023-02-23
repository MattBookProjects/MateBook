import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router";
import { UrlConstant } from "src/app/constant/url.constant";
import { ApiService } from "../api/api.service";
import { RegisterService } from "./register.service";

describe('Tests for register service', () => {
    describe('Tests for register function', () => {
        let mockHttpClient: HttpClient;
        let mockUrlConstant: UrlConstant;
        let mockApiService: ApiService;
        let mockRouter: Router;
        beforeEach(() => {
            mockHttpClient = {
                post: (url: string, body: any, options?: any) => {}
            } as unknown as HttpClient;
            mockUrlConstant = { } as unknown as UrlConstant;
            mockApiService = {
                post: (url: string, body: any) => ({
                    subscribe: ( callbacks: {next: (response: any) => void, error: (response: any) => void }) => { callbacks.next({status: 201}) }
                })
            } as unknown as ApiService;
            mockRouter = {
                navigateByUrl: (url: string) => {}
            } as unknown as Router;
        });
        it('on correct registration return null, call navigateByUrl', async () => {
            spyOn(mockRouter, 'navigateByUrl');
            const registerService = new RegisterService(mockHttpClient, mockUrlConstant, mockApiService, mockRouter);
            let ret = registerService.register('username', 'password', 'first name', 'last name');
            await expectAsync(ret).toBeResolvedTo(null);
            expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/registersuccess');
        });
        it('Return message on connection error', async() => {
            mockApiService = {
                post: (url: string, body: any) => ({
                    subscribe: ( callbacks: {next: (response: any) => void, error: (response: any) => void }) => { callbacks.error({status: 0}) }
                })
            } as unknown as ApiService;
            spyOn(mockRouter, 'navigateByUrl');
            const registerService = new RegisterService(mockHttpClient, mockUrlConstant, mockApiService, mockRouter);
            let ret = registerService.register('username', 'password', 'first name', 'last name');
            await expectAsync(ret).toBeResolvedTo('Connection error, please try again later');
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        }); 
        it('Return message on username taken', async() => {
            mockApiService = {
                post: (url: string, body: any) => ({
                    subscribe: ( callbacks: {next: (response: any) => void, error: (response: any) => void }) => { callbacks.error({status: 409, error: {message: 'Username already taken'}}) }
                })
            } as unknown as ApiService;
            spyOn(mockRouter, 'navigateByUrl');
            const registerService = new RegisterService(mockHttpClient, mockUrlConstant, mockApiService, mockRouter);
            let ret = registerService.register('username', 'password', 'first name', 'last name');
            await expectAsync(ret).toBeResolvedTo('Username already taken');
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        }); 
        it('Return message on internal server error', async() => {
            mockApiService = {
                post: (url: string, body: any) => ({
                    subscribe: ( callbacks: {next: (response: any) => void, error: (response: any) => void }) => { callbacks.error({status: 500, error: {message: 'Internal server error'}}) }
                })
            } as unknown as ApiService;
            spyOn(mockRouter, 'navigateByUrl');
            const registerService = new RegisterService(mockHttpClient, mockUrlConstant, mockApiService, mockRouter);
            let ret = registerService.register('username', 'password', 'first name', 'last name');
            await expectAsync(ret).toBeResolvedTo('Internal server error');
            expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        }); 
    })
})