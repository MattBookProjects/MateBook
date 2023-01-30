import login from '../../../app/web/controllers/login';
import database from '../../../database';
//import * as utils from '../utils.js';
import { jest } from '@jest/globals';
import ResponseConst from '../../../app/constants/response.const';
import loginService from '../../../app/services/login.service';


describe('Tests for login endpoint,', () => {
    let request;
    let response = {
        status: jest.fn().mockReturnValue({json: jest.fn()})
    }

 
    describe('Should return 400 on bad request', () => {
        test('Should return 400 if some parameters are missing', async () => {
            request = {
                body: {
                    username: 'username'
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INVALID_INPUT.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INVALID_INPUT.message});
        });
        test('Should return 400 if some parameters are empty strings', async () => {
            request = {
                body: {
                    username: 'username',
                    password: ''
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INVALID_INPUT.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INVALID_INPUT.message});
        });
        test('Should return 400 if some parameters are not strings', async () => {
            request = {
                body: {
                    username: 'username',
                    password: true
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith( ResponseConst.RESPONSE_INVALID_INPUT.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INVALID_INPUT.message});
        });
    });
    describe('Should return 401 if the user cannot be authenticated', () => {
        test('Should return 401 if the username or password are incorrect', async () => {
            loginService.login = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INCORRECT_USERNAME_OR_PASSWORD);
            request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INCORRECT_USERNAME_OR_PASSWORD.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INCORRECT_USERNAME_OR_PASSWORD.message});
        })
    })
    describe('Should return 500 on interal server errors', () => {
        test('Should return 500 on internal server error', async () => {
            loginService.login = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INTERNAL_ERROR);
            request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
            await login(request,response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INTERNAL_ERROR.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INTERNAL_ERROR.message});
        });
    });
});