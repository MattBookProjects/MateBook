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
                    subscribe: ( callback: (response: any) => void ) => { callback({status: 201}) }
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
        }) 
    })
})