import login from '../app/login.js'
import database from '../database';
import { jest } from '@jest/globals';

describe('Tests for login endpoint,', () => {
    let response;
    beforeAll(() => {
        response = {
            status: jest.fn().mockReturnValue({json: jest.fn()})
        }
    })
    describe('Should return 400 on bad request', () => {
        beforeEach(() => {
            response.status.mockClear();
            response.status().json.mockClear();
        })
        test('Should return 400 if some parameters are missing', async () => {
            const request = {
                body: {
                    username: 'username'
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Invalid input'});
        });
        test('Should return 400 if some parameters are empty strings', async () => {
            const request = {
                body: {
                    username: 'username',
                    password: ''
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Invalid input'});
        });
        test('Should return 400 if some parameters are not strings', async () => {
            const request = {
                body: {
                    username: 'username',
                    password: true
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Invalid input'});
        });
    });
    describe('Should return 500 on interal server errors', () => {
        test('Should return 500 if error occures during user exists check', async () => {
            database.userExists = jest.fn().mockRejectedValueOnce('error');
            const request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
        test('')
    })
})
