import loginService from "../../app/services/login.service";
import database from "../../database";
import encryption from '../../app/utils/encryption';
import { jest } from "@jest/globals";
import ResponsesConst from "../../app/constants/response.const";

describe('Tests for login service', () => {
    describe('Tests for login function', () => {
        const username = 'username';
        const password = 'password';
    
        test('Should return status 200 and user credentials on correct login', async () => {
            database.userExists =  jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({id: 1});
            database.sessionExists = jest.fn().mockResolvedValueOnce(false);
            database.createSession = jest.fn().mockResolvedValueOnce(true);
            encryption.generateAuthToken = jest.fn().mockReturnValueOnce('000')
            await expect(loginService.login(username, password)).resolves.toEqual({user_id: 1, session_token: '000'});
        });
        test('Should return status 401 on incorrect username or password', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(false);
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INCORRECT_USERNAME_OR_PASSWORD);
        });
        test('Should return status 500 when internal error occures during checking if user exists', async () => {
            database.userExists = jest.fn().mockRejectedValueOnce('Error');
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INTERNAL_ERROR);

        });
        test('Should return status 500 when internal error occures during retrieving user for the database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockRejectedValueOnce('Error');
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should return status 500 when internal error occures during creating a session', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockResolvedValueOnce(false)
            database.createSession = jest.fn().mockRejectedValueOnce('error');
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should return status 500 when internal error occures during checking if session exists', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockRejectedValueOnce('error');
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should return status 500 when internal error occures during deleting old session', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({});
            database.sessionExists = jest.fn().mockResolvedValueOnce(true);
            database.deleteSession = jest.fn().mockRejectedValueOnce('error')
            await expect(loginService.login(username, password)).rejects.toEqual(ResponsesConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should delete old session for this user from database if exists', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            database.getUser = jest.fn().mockResolvedValueOnce({id: 1});
            database.sessionExists = jest.fn().mockResolvedValueOnce(true);
            database.deleteSession = jest.fn().mockResolvedValueOnce(true);
            await loginService.login(username, password);
            expect(database.deleteSession).toBeCalledWith({user_id: 1});
        });
        
    })
})