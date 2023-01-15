import register from '../app/register.js';
import {jest} from '@jest/globals';
import database from '../database.js';

//jest.mock('../database.js');

describe('Tests for register endpoint', () => {
    describe('Should send 400 on bad request', () => {
        test('Should send 400 on missing request parameters', async () => {
            const request = {
                body: {
                    username: 'username'
                }
            };
            const response = {
                status: jest.fn(),
            }
            response.status.mockReturnValue({ json: jest.fn() });
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
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({ json: jest.fn() });
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
            }
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({ json: jest.fn() });
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({ message: 'Invalid input' });
        })
    });
    describe('Should send 409 if username is taken', () => {
        test('Should send 409 if username is taken', async () => {
           database.userExists = jest.fn().mockResolvedValueOnce(true);
        
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({json: jest.fn()});
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(409);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Username already taken'});
        });
    });
    describe('Should return 500 if internl server error occured', () => {
        test('Should return 500 if an error occured during user exists check', async () => {
            database.userExists = jest.fn().mockRejectedValueOnce('error');
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({json: jest.fn()});
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
        test('Should return 500 if an error occured while creating the user in the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(false);
            database.createUser = jest.fn().mockRejectedValueOnce('error');
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({json: jest.fn()});
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        })
    });
    describe('Should send 201 on correct registration', () => {
        test('Should send 201 on correct registration', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(false);
            database.createUser = jest.fn().mockResolvedValueOnce({id: 1});
            const request = {
                body: { 
                    username: 'username',
                    password: 'password',
                    first_name: 'firstName',
                    last_name: 'lastName'
                }
            };
            const response = {
                status: jest.fn()
            }
            response.status.mockReturnValue({json: jest.fn()});
            await register(request, response);
            expect(response.status).toHaveBeenCalledWith(201);
           // expect(response.status().json).toHaveBeenCalledWith({message: 'Username already taken'});
        })
    })
})