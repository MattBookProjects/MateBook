import register from '../../../app/web/controllers/register.js';
import { jest } from '@jest/globals';
import registerService from '../../../app/services/register.service.js';
import ResponseConst from '../../../app/constants/response.const.js';

//jest.mock('../database.js');

describe('Tests for register endpoint', () => {
    let response;
    beforeAll(() => {
        response = {
            status: jest.fn().mockReturnValue({json: jest.fn()})
        }
    })
    describe('Should send 400 on bad request', () => {
        test('Should send 400 on missing request parameters', async () => {
            const request = {
                body: {
                    username: 'username'
                }
            };
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({ message: 'Invalid input' });
        });
        test('Should send 400 on incorrect request parameters', async () => {
            const request = {
                body: {
                    username: 'username',
                    password: 'password',
                    first_name: 'first_name',
                    last_name: null
                }
            };
            await register(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({ message: 'Invalid input' });
        });
        test('Should return 400 if some parameters are empty strings', async () => {
            const request = {
                username: 'username',
                password: 'password',
                first_name: 'first_name',
                last_name: ''
            };
            await register(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({ message: 'Invalid input' });
        })
    });
    describe('Should send 409 if username is taken', () => {
        test('Should send 409 if username is taken', async () => {
           registerService.register = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_USERNAME_ALREADY_TAKEN);
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(409);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Username already taken'});
        });
    });
    describe('Should return 500 if internl server error occured', () => {
        test('Should return 500 if an error occured during user exists check', async () => {
            registerService.register = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INTERNAL_ERROR);
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
    });
    describe('Should return 201 on correct registration', () => {
        test('Should return 201 on correct registration', async () => {
            registerService.register = jest.fn().mockResolvedValueOnce(true);
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(201);
        })
    })
})