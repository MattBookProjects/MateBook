import registerService from '../../app/services/register.service';
import database from '../../database';
import { jest } from '@jest/globals';
import ResponseConst from '../../app/constants/response.const';

describe('Tests for register service', () => {
    describe('Tests for register function', () => {
        const username = 'username';
        const password = 'password';
        const first_name = 'first_name';
        const last_name = 'last_name';
        test('Should return 201 on correct registration', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(false);
            database.createUser = jest.fn().mockResolvedValueOnce({});
            await expect(registerService.register(username, password, first_name, last_name)).resolves.toEqual(ResponseConst.RESPONSE_CREATED);
        });
        test('Should return 500 if an error occured during creating user in database', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(false);
            database.createUser = jest.fn().mockRejectedValueOnce('error');
            await expect(registerService.register(username, password, first_name, last_name)).rejects.toEqual(ResponseConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should return 500 if an error occured during checking if username is already taken', async () => {
            database.userExists = jest.fn().mockRejectedValueOnce('error');
            await expect(registerService.register(username, password, first_name, last_name)).rejects.toEqual(ResponseConst.RESPONSE_INTERNAL_ERROR);
        });
        test('Should return 409 if username is already taken', async () => {
            database.userExists = jest.fn().mockResolvedValueOnce(true);
            await expect(registerService.register(username, password, first_name, last_name)).rejects.toEqual(ResponseConst.RESPONSE_USERNAME_ALREADY_TAKEN);
        });

    })
})