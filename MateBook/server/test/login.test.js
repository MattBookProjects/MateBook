import login from '../app/login.js';
import database from '../database';
//import * as utils from '../utils.js';
import { jest } from '@jest/globals';
import authentication from '../utils/authentication.js';


describe('Tests for login endpoint,', () => {
    let request, response;
    beforeAll(() => {
        response = {
            status: jest.fn().mockReturnValue({json: jest.fn().mockReturnValue({cookie: jest.fn()})})
        }
    });
    beforeEach(() => {
        response.status.mockClear();
        response.status().json.mockClear();
        response.status().json().cookie.mockClear();
    });
    describe('Should return 400 on bad request', () => {
        test('Should return 400 if some parameters are missing', async () => {
            request = {
                body: {
                    username: 'username'
                }
            }
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Invalid input'});
        });
        test('Should return 400 if some parameters are empty strings', async () => {
            request = {
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
            request = {
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
    describe('Should return 401 if the user cannot be authenticated', () => {
        test('Should return 401 if the username or password are incorrect', async () => {
            request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
            database.userExists = jest.fn().mockResolvedValueOnce(false);

            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(401);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Incorrect username or password'});
        })
    })
    describe('Should return 500 on interal server errors', () => {
        beforeAll(() => {
            request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
        });
        test('Should return 500 if error occures during user exists check', async () => {
            database.userExists = jest.fn().mockRejectedValueOnce('error');
         
            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
        test('Should return 500 if error occures while retrieving the user for the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockRejectedValueOnce('error');

            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
        test('Should return 500 if error occures during session exists check', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockRejectedValueOnce('error');

            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
        test('Should return 500 if error occures while creating the session in the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockResolvedValueOnce(false);
            database.createSession = jest.fn().mockRejectedValueOnce('error');

            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
  
        test('Should return 500 if error occures while deleting the old session from the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockResolvedValueOnce(true);
            database.deleteSession = jest.fn().mockRejectedValueOnce('error');

            await login(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.status().json).toHaveBeenCalledWith({message: 'Internal server error'});
        });
    });
    describe('Should return 200 and user id and session token on correct login', () => {
        beforeAll(() => {
            request = {
                body: {
                    username: 'username',
                    password: 'password'
                }
            }
        });
        test('Should return 200 and user id and session token on correct login, should call createSession on the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({id: 1});
            database.sessionExists = jest.fn().mockResolvedValueOnce(false);
            database.createSession = jest.fn().mockResolvedValueOnce({});
            authentication.generateAuthToken = jest.fn().mockReturnValueOnce('authtoken');

            await login(request, response);
            expect(database.createSession).toHaveBeenCalledWith({user_id: 1, session_token: 'authtoken'});
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.status().json).toHaveBeenCalledWith({user_id: 1, session_token: 'authtoken'});
        });
        test('Should return 200 and user id and session token on correct login, should call delete session on the database if session for this user already exists', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({id: 1});
            database.sessionExists = jest.fn().mockResolvedValueOnce(true);
            database.createSession = jest.fn().mockResolvedValueOnce({});
            database.deleteSession = jest.fn().mockResolvedValueOnce({});
            authentication.generateAuthToken = jest.fn().mockReturnValueOnce('authtoken');

            await login(request, response)
            expect(database.createSession).toHaveBeenCalledWith({user_id: 1, session_token: 'authtoken'});
            expect(database.deleteSession).toHaveBeenCalledWith({user_id: 1});
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.status().json).toHaveBeenCalledWith({user_id: 1, session_token: 'authtoken'});
        })
    })
})
